import { Cart } from "@prisma/client";

export interface CartExtend extends Cart {
  cart_items: CartItem[];
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: string;
    image: string;
  };
}
