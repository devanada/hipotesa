import { Category } from "@prisma/client";

import { IResponseSuccess } from "@/utils/types/api";
import Fetch from "@/utils/apis/fetch";

export const getCategories = async (params?: any) => {
  const response = await Fetch.get<Category[]>("/api/categories");
  return response as IResponseSuccess<Category[]>;
};

export const getCategoryById = async (params?: any) => {
  const response = await Fetch.get<Category>(`/api/categories/${params}`);
  return response as IResponseSuccess<Category>;
};
