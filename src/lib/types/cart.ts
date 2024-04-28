import * as z from "zod";

export const cartSchema = z.object({
  product_id: z.string().min(1, {
    message: "Product is required",
  }),
  quantity: z.number().min(1, {
    message: "Quantity is required",
  }),
});

export type CartSchema = z.infer<typeof cartSchema>;
