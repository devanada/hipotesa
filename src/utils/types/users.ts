import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export type Roles = "user" | "admin" | "superadmin";

export const userBaseSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size !== 0 || file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  address: z.string().optional(),
});
export const userSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
  })
  .merge(userBaseSchema);

export type UserBaseSchema = z.infer<typeof userBaseSchema>;
export type UserSchema = z.infer<typeof userSchema>;
