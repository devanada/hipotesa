"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { IResponseSuccess, IResponseFailed } from "@/lib/types/api";
import { ProductExtend } from "@/lib/apis/products/type";
import { FormState } from "@/lib/hooks/useFormAction";
import Fetch from "@/lib/apis/fetch";

export async function createProduct(
  prevState: FormState,
  formData: FormData
): Promise<IResponseFailed> {
  try {
    await Fetch.create<ProductExtend>("/api/products", formData);
  } catch (error) {
    return {
      message: "Failed to create product",
      reason: JSON.stringify(error),
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
    return {
      message: "Failed to create product",
      reason: JSON.stringify(error),
    };
  }

  revalidateTag("products");
  redirect("/dashboard/products");
}
