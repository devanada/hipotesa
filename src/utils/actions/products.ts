"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { addProduct, editProduct, removeProduct } from "../apis/products";
import { IResponseFailed } from "@/utils/types/api";

export async function handleAddProduct(
  prevState: IResponseFailed,
  formData: FormData
) {
  try {
    await addProduct(formData);
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

export async function handleEditProduct(
  productId: string,
  prevState: IResponseFailed,
  formData: FormData
) {
  try {
    await editProduct(productId, formData);
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

export async function handleRemoveProduct(productId: string) {
  try {
    await removeProduct(productId);
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
