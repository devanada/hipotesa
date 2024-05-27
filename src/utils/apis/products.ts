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

export const addProduct = async (data: FormData) => {
  const response = await Fetch.create<null>("/api/products", {
    body: data,
  });
  return response;
};

export const editProduct = async (path: string, data: FormData) => {
  const response = await Fetch.update<null>(`/api/products/${path}`, {
    body: data,
  });
  return response;
};

export const removeProduct = async (path: string) => {
  const response = await Fetch.remove<null>(`/api/products/${path}`);
  return response;
};
