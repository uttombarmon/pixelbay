import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null; // ✅ Added role
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    role?: string | null; // ✅ Added role for user from DB
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string | null; // ✅ Added role to JWT token
  }
}
