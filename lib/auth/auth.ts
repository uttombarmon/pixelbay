import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "../db/drizzle";
import { users } from "../db/schema/schema";
import { type Role, roles } from "./permissions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        if (!email || !password) {
          return null;
        }

        try {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (!user?.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          // Return only the fields needed by Auth.js.
          // Never expose the stored password hash in the session.
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch {
          // Fail closed. Add sanitized server-side error monitoring later.
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // Only Google is configured as an OAuth provider here.
      // Let the Drizzle adapter manage OAuth user/account records.
      if (account?.provider === "google") {
        const googleProfile = profile as
          { email_verified?: boolean } | undefined;

        if (googleProfile?.email_verified !== true) {
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      // Runs when Auth.js provides a user during sign-in.
      if (user?.id) {
        const [dbUser] = await db
          .select({
            role: users.role,
          })
          .from(users)
          .where(eq(users.id, user.id))
          .limit(1);

        token.id = user.id;
        token.role = dbUser?.role ?? "user";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id =
          typeof token.id === "string" ? token.id : (token.sub ?? "");

        session.user.role =
          typeof token.role === "string" &&
          (roles as readonly string[]).includes(token.role)
            ? (token.role as Role)
            : "user";
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
});
