import { Cart } from "@prisma/client";
import * as z from "zod";

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

export const cartSchema = z.object({
  product_id: z
    .string()
    .min(1, {
      message: "Product is required",
    })
    .optional(),
  quantity: z.number().min(1, {
    message: "Quantity is required",
  }),
});

export type CartSchema = z.infer<typeof cartSchema>;
