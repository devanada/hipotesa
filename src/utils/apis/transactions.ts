import {
  OrderExtend,
  OrderSchema,
  TransactionSchema,
} from "@/utils/types/transactions";
import { SearchParams } from "@/utils/types/api";
import Fetch from "@/utils/apis/fetch";
import { ProductExtend } from "../types/products";

export const getTransactions = async (params?: SearchParams) => {
  const response = await Fetch.get<OrderExtend[]>("/api/transactions", {
    query: params,
    next: {
      tags: ["transactions"],
    },
  });
  return response;
};

export const getTransactionById = async (path: string) => {
  const response = await Fetch.get<OrderExtend>(`/api/transactions/${path}`);
  return response;
};

export const createTransaction = async (data: TransactionSchema) => {
  const response = await Fetch.create<string>("/api/transactions", {
    body: JSON.stringify(data),
  });
  return response;
};

export const editTransaction = async (path: string, data: OrderSchema) => {
  const response = await Fetch.update<ProductExtend>(
    `/api/transactions/${path}`,
    {
      body: JSON.stringify(data),
    }
  );
  return response;
};
