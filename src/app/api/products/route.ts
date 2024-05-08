import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { productSchema } from "@/lib/types/product";
import { constructQuery, fileUploader, isNoAuth } from "@/lib/functions";
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
    let query = constructQuery<Prisma.ProductFindManyArgs>(request);

    const data = await prisma.product.findMany({
      ...query,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      cacheStrategy: { ttl: 60 },
    });

    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / 10);

    return NextResponse.json({
      message: "Successfully get products",
      metadata: {
        totalCount,
        totalPages,
      },
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
