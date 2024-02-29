import type { User } from "@prisma/client";
import { compare } from "bcrypt";

import { prisma } from "@/db";

export async function login(
  body: Record<"email" | "password", string>
): Promise<User | null> {
  const response = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (response) {
    const passwordCorrect = await compare(body.password, response.password);

    if (passwordCorrect) {
      return response as User;
    }
  }

  return null;
}
