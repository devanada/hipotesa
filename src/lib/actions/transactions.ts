"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { IResponseSuccess, IResponseFailed } from "@/lib/types/api";
import { ProductExtend } from "@/lib/apis/products/type";
import { FormState } from "@/lib/hooks/useFormAction";
import Fetch from "@/lib/apis/fetch";
import { OrderSchema } from "../types/transactions";

export async function createTransaction(
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
