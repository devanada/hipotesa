"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { IResponseFailed } from "@/utils/types/api";
import { CartSchema } from "../types/carts";
import {
  addItemToCart,
  editItemOnCart,
  removeItemFromCart,
} from "../apis/carts";

export async function handleAddItem(formData: FormData) {
  try {
    const payload = {
      product_id: formData.get("product_id") as string,
      quantity: 1,
    };

    await addItemToCart(payload);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("cart");
  redirect("/cart");
}

export async function handleEditItem(itemId: string, data: CartSchema) {
  try {
    await editItemOnCart(itemId, data);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("cart");
}

export async function handleRemoveItem(itemId: string) {
  try {
    await removeItemFromCart(itemId);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("transactions");
  revalidateTag("cart");
}
