"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { IResponseSuccess, IResponseFailed } from "@/utils/types/api";
import { ProductExtend } from "@/utils/types/products";
import { FormState } from "@/utils/hooks/use-form-action";
import Fetch from "@/utils/apis/fetch";

export async function createProduct(
  prevState: FormState,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    await Fetch.create<ProductExtend>("/api/products", formData);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("products");
  redirect("/dashboard/products");
}

export async function editProduct(
  categoryId: number,
  prevState: FormState,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    await Fetch.update<ProductExtend>(`/api/products/${categoryId}`, formData);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("products");
  redirect("/dashboard/products");
}
