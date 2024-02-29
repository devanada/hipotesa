import type { Post } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/db";

export async function fetchPosts(): Promise<Post[]> {
  return await prisma.post.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchPostById(id: string): Promise<Post | null> {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
