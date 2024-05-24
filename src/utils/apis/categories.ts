import { Category } from "@prisma/client";

import { CategorySchema } from "../types/categories";
import Fetch from "@/utils/apis/fetch";

export const getCategories = async () => {
  const response = await Fetch.get<Category[]>("/api/categories", {
    next: {
      tags: ["categories"],
    },
  });
  return response;
};

export const getCategoryById = async (path?: string) => {
  const response = await Fetch.get<Category>(`/api/categories/${path}`);
  return response;
};

export const addCategory = async (data: CategorySchema) => {
  const response = await Fetch.create<null>("/api/categories", {
    body: JSON.stringify(data),
  });
  return response;
};

export const editCategory = async (path: string, data: CategorySchema) => {
  const response = await Fetch.update<null>(`/api/categories/${path}`, {
    body: JSON.stringify(data),
  });
  return response;
};

export const removeCategory = async (path: string) => {
  const response = await Fetch.remove<null>(`/api/categories/${path}`);
  return response;
};
