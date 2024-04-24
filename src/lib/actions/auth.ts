"use server";

import type { User } from "@prisma/client";
import { redirect } from "next/navigation";

import { RegisterSchema, registerSchema } from "@/lib/types/auth";
import { IResponseSuccess, IResponseFailed } from "@/lib/types/api";

export async function postRegister(prevState: any, formData: FormData) {
  const body = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      redirect("/login");
    }

    return (await response.json()) as IResponseFailed;
  } catch (error) {
    console.log(error);

    return { message: "Failed" };
  }
}
