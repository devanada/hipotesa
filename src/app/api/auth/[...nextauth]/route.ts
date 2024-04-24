import type { User } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";

import { prisma } from "@/db";
import { IResponseFailed, IResponseSuccess } from "@/lib/types/api";

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
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        if (response.ok) {
          const { data } = (await response.json()) as IResponseSuccess<User>;
          return data;
        }

        const result = (await response.json()) as IResponseFailed;
        throw new Error(JSON.stringify(result));
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
