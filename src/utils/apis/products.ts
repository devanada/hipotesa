import { ProductExtend } from "@/utils/types/products";
import { SearchParams } from "@/utils/types/api";
import Fetch from "@/utils/apis/fetch";

export const getProducts = async (params?: SearchParams) => {
  const response = await Fetch.get<ProductExtend[]>("/api/products", {
    query: params,
  });
  return response;
};

export const getProductById = async (path: string) => {
  const response = await Fetch.get<ProductExtend>(`/api/products/${path}`);
  return response;
};
