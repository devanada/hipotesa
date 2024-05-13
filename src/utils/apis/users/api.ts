import { User } from "@prisma/client";

import { IResponseSuccess, IResponsePagination } from "@/utils/types/api";
import Fetch from "@/utils/apis/fetch";

export const getUsers = async (params?: any) => {
  const response = await Fetch.get<User[]>("/api/users");
  return response as IResponsePagination<User[]>;
};

export const getUserById = async (params?: any) => {
  const response = await Fetch.get<User>(`/api/users/${params}`);
  return response as IResponseSuccess<User>;
};
