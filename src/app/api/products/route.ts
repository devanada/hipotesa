import type { Product } from "@prisma/client";
import { NextResponse } from "next/server";

import { ProductSchema, productSchema } from "@/lib/types/product";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const category_id = formData.get("category_id") as string;

    const validatedFields = productSchema.safeParse({
      name,
      description,
      price,
      // TODO: Adjust image field to optional
      // image: formData.get("image"),
      category_id: category_id,
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

    const data = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category_id: +category_id!,
      },
    });

    return NextResponse.json({
      message: "Successfully added product to database",
      data,
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
    // TODO: Add query params
    const data = await prisma.product.findMany({
      cacheStrategy: { ttl: 60 },
    });

    if (data.length === 0) {
      return NextResponse.json(
        {
          message: "Get products failed, data not found",
          reason: "There is no record on database about products",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Successfully get products",
      data,
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
