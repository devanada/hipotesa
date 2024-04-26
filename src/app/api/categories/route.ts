import { NextResponse } from "next/server";

import { CategorySchema, categorySchema } from "@/lib/types/categories";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name } = (await request.json()) as CategorySchema;

    const validatedFields = categorySchema.safeParse({
      name,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Add category failed, please check your input again",
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Successfully added category to database",
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Add category failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // TODO: Add query params
    const data = await prisma.category.findMany({
      cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json({
      message: "Successfully get categories",
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Get categories failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
