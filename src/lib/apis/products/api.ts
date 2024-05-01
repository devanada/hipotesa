import { IResponseSuccess } from "@/lib/types/api";
import { ProductExtend } from "./type";

export const getProducts = async (params?: any) => {
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as IResponseSuccess<ProductExtend[]>;
};

export const getDetailProduct = async (product_id: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/products/${product_id}`,
    {
      next: { revalidate: 1 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as IResponseSuccess<ProductExtend>;
};
