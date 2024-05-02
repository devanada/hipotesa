import { IResponseSuccess } from "@/lib/types/api";
import Fetch from "@/lib/apis/fetch";
import { OrderExtend } from "./type";

export const getOrders = async (params?: any) => {
  const response = await Fetch.get<OrderExtend[]>("/api/transactions");
  return response;
};

export const getDetailProduct = async (product_id: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/transactions/${product_id}`,
    {
      next: { revalidate: 1 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as IResponseSuccess<OrderExtend>;
};
