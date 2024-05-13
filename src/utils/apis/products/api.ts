import { IResponseSuccess, IResponsePagination } from "@/utils/types/api";
import { ProductExtend } from "@/utils/types/products";
import Fetch from "@/utils/apis/fetch";

export const getProducts = async (params?: any) => {
  const response = await Fetch.get<ProductExtend[]>("/api/products", params);
  return response as IResponsePagination<ProductExtend[]>;
};

export const getProductById = async (params?: any) => {
  const response = await Fetch.get<ProductExtend>(`/api/products/${params}`);
  return response as IResponseSuccess<ProductExtend>;
};
