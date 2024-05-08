import { User } from "@prisma/client";

import { IResponseSuccess, IResponsePagination } from "@/lib/types/api";
import Fetch from "@/lib/apis/fetch";

export const getUsers = async (params?: any) => {
  const response = await Fetch.get<User[]>("/api/users");
  return response as IResponsePagination<User[]>;
};

export const getUserById = async (params?: any) => {
  const response = await Fetch.get<User>(`/api/users/${params}`);
  return response as IResponseSuccess<User>;
};
