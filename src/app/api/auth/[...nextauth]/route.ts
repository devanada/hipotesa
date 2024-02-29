import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import { compare } from "bcrypt";

import { prisma } from "@/db";
import { login } from "@/db/queries/auth";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        return await login(credentials);
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (
        account?.provider === "google" &&
        profile?.email?.endsWith("@alterra.id")
      ) {
        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) {
        const { searchParams } = new URL(url);

        if (searchParams.get("callbackUrl")) {
          return searchParams.get("callbackUrl")!;
        }

        return url;
      }

      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
