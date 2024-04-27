import type { Provider } from "next-auth/providers";
import type { NextAuthConfig } from "next-auth";
import type { User } from "@prisma/client";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { IResponseFailed, IResponseSuccess } from "@/lib/types/api";
import { Roles } from "@/lib/types/user";
import { prisma } from "@/lib/db";

const providers: Provider[] = [
  Google({ allowDangerousEmailAccountLinking: true }),
  GitHub({
    allowDangerousEmailAccountLinking: true,
  }),
  Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: "no-reply@devanada.com",
  }),
  // Credentials({
  //   async authorize(credentials) {
  //     const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     });

  //     if (response.ok) {
  //       const { data } = (await response.json()) as IResponseSuccess<User>;
  //       return data;
  //     }

  //     const result = (await response.json()) as IResponseFailed;
  //     throw new Error(result.message);
  //   },
  // }),
];

const config = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: "database",
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
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface User {
    role: Roles;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Roles;
  }
}
