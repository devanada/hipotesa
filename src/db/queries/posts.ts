import type { Product } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/db";

export async function fetchPosts(): Promise<Product[]> {
  return await prisma.product.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
}

export async function fetchPostById(id: string): Promise<Product | null> {
  const post = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
