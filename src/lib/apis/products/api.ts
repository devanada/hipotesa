import { IResponseSuccess } from "@/lib/types/api";
import Fetch from "@/lib/apis/fetch";
import { ProductExtend } from "./type";

export const getProducts = async (params?: any) => {
  const response = await Fetch.get<ProductExtend[]>("/api/products");
  return response as IResponseSuccess<ProductExtend[]>;
};

export const getProductById = async (params?: any) => {
  const response = await Fetch.get<ProductExtend>(`/api/products/${params}`);
  return response as IResponseSuccess<ProductExtend>;
};