import { CartExtend, CartSchema } from "@/utils/types/carts";
import Fetch from "@/utils/apis/fetch";

export const getCart = async () => {
  const response = await Fetch.get<CartExtend>("/api/carts", {
    next: {
      tags: ["carts"],
    },
  });
  return response;
};

export const addItemToCart = async (data: CartSchema) => {
  const response = await Fetch.create<null>("/api/carts", {
    body: JSON.stringify(data),
  });
  return response;
};

export const editItemOnCart = async (path: string, data: CartSchema) => {
  const response = await Fetch.update<null>(`/api/carts/${path}`, {
    body: JSON.stringify(data),
  });
  return response;
};

export const removeItemFromCart = async (path: string) => {
  const response = await Fetch.remove<null>(`/api/carts/${path}`);
  return response;
};
