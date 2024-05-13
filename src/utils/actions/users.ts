"use server";

import { redirect } from "next/navigation";

import { FormState } from "@/utils/hooks/use-form-action";
import { IResponseFailed } from "@/utils/types/api";
import Fetch from "@/utils/apis/fetch";

export async function editProfile(
  prevState: FormState,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    await Fetch.update(`/api/users`, formData);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  redirect("/user");
}
