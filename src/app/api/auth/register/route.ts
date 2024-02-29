import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { prisma } from "@/db";
import { RegisterSchema } from "@/lib/types/auth";

export async function POST(request: Request) {
  try {
    const { email, password, ...body } =
      (await request.json()) as RegisterSchema;
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        ...body,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      message: "Register is successfull",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to register",
      reason: (error as Error).message,
    });
  }
}
