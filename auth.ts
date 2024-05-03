import type { Provider } from "next-auth/providers";
import type { NextAuthConfig } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import NextAuth from "next-auth";

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
      session.user.address = user.address;
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
    address: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Roles;
    address: string;
  }
}
