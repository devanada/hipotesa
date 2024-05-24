"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { addCategory, editCategory, removeCategory } from "../apis/categories";
import { IResponseFailed } from "@/utils/types/api";

export async function handleAddCategory(
  prevState: IResponseFailed,
  formData: FormData
) {
  try {
    const payload = {
      name: formData.get("name") as string,
    };

    await addCategory(payload);
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

export async function handleEditCategory(
  categoryId: string,
  prevState: IResponseFailed,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    const payload = {
      name: formData.get("name") as string,
    };

    await editCategory(categoryId, payload);
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

export async function handleRemoveCategory(categoryId: string) {
  try {
    await removeCategory(categoryId);
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
