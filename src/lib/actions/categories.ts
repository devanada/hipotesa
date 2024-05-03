"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Category } from "@prisma/client";

import { IResponseSuccess, IResponseFailed } from "@/lib/types/api";
import { FormState } from "@/lib/hooks/useFormAction";
import Fetch from "@/lib/apis/fetch";

export async function createCategory(
  prevState: FormState,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    const body = Object.fromEntries(formData.entries());

    await Fetch.create<Category>("/api/categories", body);
  } catch (error) {
    return {
      message: "Failed to create category",
      reason: JSON.stringify(error),
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
    return {
      message: "Failed to create category",
      reason: JSON.stringify(error),
    };
  }

  revalidateTag("categories");
  redirect("/dashboard/categories");
}
