import { User } from "@prisma/client";

import { SearchParams } from "@/utils/types/api";
import Fetch from "@/utils/apis/fetch";

export const getUsers = async (params?: SearchParams) => {
  const response = await Fetch.get<User[]>("/api/users", { query: params });
  return response;
};

export const getUserById = async (path: string) => {
  const response = await Fetch.get<User>(`/api/users/${path}`);
  return response;
};

export const editProfile = async (data: FormData) => {
  const response = await Fetch.update<null>("/api/users", {
    body: data,
  });
  return response;
};
