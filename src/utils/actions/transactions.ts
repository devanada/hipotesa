"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { createTransaction, editTransaction } from "../apis/transactions";
import { IResponseFailed } from "@/utils/types/api";
import { OrderSchema } from "../types/transactions";

export async function handleCreateTransaction(formData: FormData) {
  let paymentUrl = "";

  try {
    const body = {
      amount: formData.get("amount") as string,
      cart_id: +(formData.get("cart_id") as string),
    };

    const response = await createTransaction(body);

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

export async function handleEditTransaction(
  transactionId: string,
  data: OrderSchema
) {
  try {
    await editTransaction(transactionId, data);
  } catch (error) {
    const { message, reason } = error as IResponseFailed;

    return {
      message: message,
      reason: reason,
    };
  }

  revalidateTag("transactions");
}
