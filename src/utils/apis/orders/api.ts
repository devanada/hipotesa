import { IResponseSuccess, IResponsePagination } from "@/utils/types/api";
import { OrderExtend } from "@/utils/types/transactions";
import Fetch from "@/utils/apis/fetch";

export const getOrders = async (params?: any) => {
  const response = await Fetch.get<OrderExtend[]>("/api/transactions");
  return response as IResponsePagination<OrderExtend[]>;
};

export const getOrderById = async (params?: any) => {
  const response = await Fetch.get<OrderExtend>(`/api/transactions/${params}`);
  return response as IResponseSuccess<OrderExtend>;
};
