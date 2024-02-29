"use server";
import type { User } from "@prisma/client";

import { RegisterSchema } from "@/lib/types/auth";
import { IResponseSuccess } from "@/lib/types/api";

export async function postRegister(body: RegisterSchema) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return (await response.json()) as IResponseSuccess<User>;
    }

    return Promise.reject(response);
  } catch (error) {
    throw Error("Failed to post login");
  }
}
