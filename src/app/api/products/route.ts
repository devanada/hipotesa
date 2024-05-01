import { NextRequest, NextResponse } from "next/server";

import { productSchema } from "@/lib/types/product";
import { fileUploader, isNoAuth } from "@/lib/functions";
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

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as File;
    const category_id = formData.get("category_id") as string;

    const validatedFields = productSchema.safeParse({
      name,
      description,
      price,
      image: image ?? undefined,
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

    let imageUrl = null;
    if (image) {
      const uploadFile = await fileUploader(image, {
        folder: "hipotesa-product",
      });
      imageUrl = uploadFile.data;
    }

    const data = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image: imageUrl,
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
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("category");
    console.log(query);
    // TODO: Add query params
    const data = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
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
