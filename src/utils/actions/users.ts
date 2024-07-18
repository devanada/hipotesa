"use server";

import { redirect } from "next/navigation";

import { IResponseFailed } from "@/utils/types/api";
import { editProfile } from "../apis/users";

export async function handleEditProfile(
  prevState: IResponseFailed,
  formData: FormData
) {
  try {
    await editProfile(formData);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  redirect("/user");
}
