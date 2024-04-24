import type { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";

import { prisma } from "@/db";
import { LoginSchema, loginSchema } from "@/lib/types/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as LoginSchema;

    const validatedFields = loginSchema.safeParse({
      email,
      password,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Login failed, please check your input again",
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const response = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (response) {
      const passwordCorrect = await compare(password, response.password);

      if (passwordCorrect) {
        return NextResponse.json({
          message: "Login successfully",
          data: response as User,
        });
      }
    }

    return NextResponse.json(
      {
        message: "Login failed, please check your email or password",
        reason: "Invalid credential",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Login failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
