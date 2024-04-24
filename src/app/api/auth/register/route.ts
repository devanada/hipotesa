import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { prisma } from "@/db";
import { RegisterSchema, registerSchema } from "@/lib/types/auth";

export async function POST(request: Request) {
  try {
    const { email, password, name } = (await request.json()) as RegisterSchema;

    const validatedFields = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Registration failed, please check your input again",
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return NextResponse.json(
        {
          message: "Registration failed, user already exist",
          reason: "Email cannot duplicate",
        },
        { status: 400 }
      );
    }

    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      message: "Register is successfull, please login",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Registration failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
