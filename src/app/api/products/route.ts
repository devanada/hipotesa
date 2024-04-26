import type { Product } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { ProductSchema, productSchema } from "@/lib/types/product";

export async function POST(request: Request) {
  try {
    const { ...fields } = (await request.json()) as ProductSchema;

    const validatedFields = productSchema.safeParse({
      fields,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Add product failed, please check your input again",
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // TODO: Fix product create
    // const product = await prisma.product.create({
    //   data: fields,
    // });

    return NextResponse.json({
      message: "Successfully added product to database",
      data: "product",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Add product failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    return NextResponse.json({
      message: "Successfully get products",
      data: "product",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Get products failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
