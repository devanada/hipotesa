"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Category } from "@prisma/client";

import { IResponseSuccess, IResponseFailed } from "@/utils/types/api";
import { FormState } from "@/utils/hooks/use-form-action";
import Fetch from "@/utils/apis/fetch";

export async function createCategory(
  prevState: FormState,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    const body = Object.fromEntries(formData.entries());

    await Fetch.create<Category>("/api/categories", body);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("categories");
  redirect("/dashboard/categories");
}

export async function editCategory(
  categoryId: number,
  prevState: FormState,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    const body = Object.fromEntries(formData.entries());

    await Fetch.update<Category>(`/api/categories/${categoryId}`, body);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("categories");
  redirect("/dashboard/categories");
}
