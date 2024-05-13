import { IResponseSuccess } from "@/utils/types/api";
import { CartExtend } from "@/utils/types/cart";
import Fetch from "@/utils/apis/fetch";

export const getCart = async (params?: any) => {
  const response = await Fetch.get<CartExtend>("/api/carts");
  return response as IResponseSuccess<CartExtend>;
};
