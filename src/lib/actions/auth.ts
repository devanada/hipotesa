"use server";

import type { User } from "@prisma/client";

// import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { IResponseSuccess, IResponseFailed } from "@/lib/types/api";
import { FormState } from "@/lib/hooks/useFormAction";
import { signIn } from "@/auth";

export async function postRegister(prevState: FormState, formData: FormData) {
  const body = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const result = (await response.json()) as IResponseSuccess<User>;
      return { message: result.message, reason: "" };
    }

    return (await response.json()) as IResponseFailed;
  } catch (error) {
    console.log("Error sign up", error);

    return { message: "Failed to sign up", reason: JSON.stringify(error) };
  }
}

function isRedirectError(error: Error & { digest?: string }) {
  return !!error.digest?.startsWith("NEXT_REDIRECT");
}

export async function login(prevState: FormState, formData: FormData) {
  try {
    await signIn("credentials", formData);

    return { message: "Login successfully", reason: "" };
  } catch (error) {
    console.log("Error sign in", error as Error);

    if (isRedirectError(error as Error)) throw error;

    if (error instanceof Error) {
      const { type, cause } = error as AuthError;

      switch (type) {
        case "CredentialsSignin":
          return {
            message: "Failed to sign in",
            reason: "Invalid credentials.",
          };
        case "CallbackRouteError":
          return {
            message: "Failed to sign in",
            reason: cause?.err?.toString() || JSON.stringify(error),
          };
        default:
          return {
            message: "Failed to sign in",
            reason: JSON.stringify(error),
          };
      }
    }

    throw error;
  }
}
