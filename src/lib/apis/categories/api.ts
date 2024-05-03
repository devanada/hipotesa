import { Category } from "@prisma/client";

import { IResponseSuccess } from "@/lib/types/api";
import Fetch from "@/lib/apis/fetch";
import { ProductExtend } from "./type";

export const getCategories = async (params?: any) => {
  const response = await Fetch.get<Category[]>("/api/categories");
  return response as IResponseSuccess<Category[]>;
};

export const getCategoriesById = async (params?: any) => {
  const response = await Fetch.get<Category>(`/api/categories/${params}`);
  return response as IResponseSuccess<Category>;
};
