import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const productSchema = z.object({
  name: z.string().min(10, {
    message: "Product name must be at least 10 characters",
  }),
  description: z.string().min(10, {
    message: "Product description must be at least 10 characters",
  }),
  price: z.string().min(1, {
    message: "Price is required",
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.name !== "", "Product image is required")
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  category_id: z.string().min(1, {
    message: "Category is required",
  }),
});

export type ProductSchema = z.infer<typeof productSchema>;
