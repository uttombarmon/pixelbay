import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../db/drizzle";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/schema";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline", // This is the key line
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email.toLowerCase()));

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("--- [signIn Callback] Debug ---");
      console.log("User object from provider/authorize:", user);
      console.log("Account object:", account);
      console.log("Profile object (raw from OAuth provider):", profile);

      if (
        account &&
        (account.provider === "google" || account.provider === "facebook")
      ) {
        console.log(`user:${user}`);
        // Type assertion for Google/Facebook profile
        const oauthProfile = profile as typeof profile & {
          email_verified?: boolean;
          email?: string;
        };

        // Basic validation for OAuth providers
        const isEmailVerified = oauthProfile?.email_verified;
        const hasEmail = !!oauthProfile?.email;

        console.log(`[signIn Callback] Provider: ${account.provider}`);
        console.log(`[signIn Callback] Email Verified: ${isEmailVerified}`);
        console.log(`[signIn Callback] Has Email: ${hasEmail}`);

        // You can add more specific checks here, e.g., domain filtering
        // if (account.provider === "google" && !oauthProfile.email?.endsWith("@yourdomain.com")) {
        //   console.log("[signIn Callback] Google sign-in denied: Email domain not allowed.");
        //   return false;
        // }

        // If email is not verified or missing, deny sign-in
        if (!isEmailVerified || !hasEmail) {
          console.log(
            "[signIn Callback] OAuth sign-in denied: Email not verified or missing."
          );
          return false; // This will lead to AccessDenied error
        }

        try {
          const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email!, user.email!));
          console.log(`Existing user lookup for ${user.email}:`, existingUser);
          if (!existingUser) {
            // New user: Create a new user record for OAuth sign-ups
            console.log(
              "[signIn Callback] New user via OAuth. Creating record."
            );
            const newUser = await db.insert(users).values({
              email: user.email!,
              emailVerified: new Date(),
            });
            console.log("New OAuth user created:", newUser);
          } else {
            // User exists: Update their profile info if it changed
            console.log(
              "[signIn Callback] Existing user found. Updating profile."
            );
          }
        } catch (dbError: any) {
          console.error(
            "[signIn Callback] Database error during OAuth signIn:",
            dbError.message
          );
          return false; // Deny sign-in if database operation fails
        }
      }
      console.log("[signIn Callback] Allowing sign-in.");
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const [dbUser] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.email, user.email!));
        token.id = user.id;
        token.name = user.name;
        token.picture = user.image;
        token.role = dbUser?.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.role = token.role;
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
