import { IResponseSuccess } from "@/lib/types/api";
import Fetch from "@/lib/apis/fetch";
import { CartExtend } from "./type";

export const getCart = async (params?: any) => {
  const response = await Fetch.get<CartExtend>("/api/carts");
  return response as IResponseSuccess<CartExtend>;
};
