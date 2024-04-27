import { NextResponse } from "next/server";

import { UserSchema, userSchema } from "@/lib/types/user";
import { isNoAuth } from "@/lib/functions";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
  try {
    if (isNoAuth(request.auth, true))
      return NextResponse.json(
        {
          message: "You need to signin to access this endpoint",
          reason: "Not authenticated",
        },
        { status: 401 }
      );

    const { name, email, address } = (await request.json()) as UserSchema;

    // TODO: Handle image upload here
    const validatedFields = userSchema.safeParse({
      name,
      email,
      address,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Add user failed, please check your input again",
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = await prisma.user.create({
      data: {
        name,
        email,
        address,
      },
    });

    return NextResponse.json({
      message: "Successfully added user to database",
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Add user failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
});

export const GET = auth(async function GET(request) {
  try {
    if (isNoAuth(request.auth, true))
      return NextResponse.json(
        {
          message: "You need to signin to access this endpoint",
          reason: "Not authenticated",
        },
        { status: 401 }
      );

    // TODO: Add query params
    const data = await prisma.user.findMany({
      cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json({
      message: "Successfully get users",
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Get users failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
});
