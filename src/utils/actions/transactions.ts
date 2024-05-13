"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { IResponseSuccess, IResponseFailed } from "@/utils/types/api";
import { ProductExtend } from "@/utils/types/products";
import { OrderSchema } from "../types/transactions";
import Fetch from "@/utils/apis/fetch";

export async function createTransaction(
  formData: FormData
): Promise<IResponseFailed> {
  const body = {
    amount: formData.get("amount") as string,
    cart_id: +(formData.get("cart_id") as string),
  };
  let paymentUrl = "";

  try {
    const response = (await Fetch.create(
      "/api/transactions",
      body
    )) as IResponseSuccess<string>;

    paymentUrl = response.data;
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  redirect(paymentUrl);
}

export async function editTransaction(
  transactionId: string,
  data: OrderSchema
) {
  try {
    await Fetch.update<ProductExtend>(
      `/api/transactions/${transactionId}`,
      data
    );
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("transactions");
}
