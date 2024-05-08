import { IResponseSuccess, IResponsePagination } from "@/lib/types/api";
import Fetch from "@/lib/apis/fetch";
import { OrderExtend } from "./type";

export const getOrders = async (params?: any) => {
  const response = await Fetch.get<OrderExtend[]>("/api/transactions");
  return response as IResponsePagination<OrderExtend[]>;
};

export const getOrderById = async (params?: any) => {
  const response = await Fetch.get<OrderExtend>(`/api/transactions/${params}`);
  return response as IResponseSuccess<OrderExtend>;
};
