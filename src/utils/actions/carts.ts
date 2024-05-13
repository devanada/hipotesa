"use server";

import { revalidateTag } from "next/cache";

import { IResponseSuccess, IResponseFailed } from "@/utils/types/api";
import { CartSchema } from "../types/cart";
import Fetch from "@/utils/apis/fetch";

export async function addItem(data: CartSchema) {
  try {
    await Fetch.create("/api/carts", data);
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

export async function editItem(item_id: string, data: CartSchema) {
  try {
    await Fetch.update(`/api/carts/${item_id}`, data);
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

export async function removeItem(item_id: string) {
  try {
    await Fetch.remove(`/api/carts/${item_id}`);
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
