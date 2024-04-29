import { NextResponse } from "next/server";

import { fileUploader, isNoAuth, nullIfError } from "@/lib/functions";
import { productSchema } from "@/lib/types/product";
import { NextAuthRequest } from "@/lib/types/api";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

interface Params {
  params: { product_id: string };
}
interface DataToUpdate {
  name: string;
  description: string;
  price: string;
  category_id: number;
  image?: string;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { product_id } = params;

    const data = await prisma.product.findFirst({
      where: {
        id: product_id,
      },
      cacheStrategy: { ttl: 60 },
    });

    if (!data) {
      return NextResponse.json(
        {
          message: "Get product failed, data not found",
          reason:
            "The product you're trying to retrieve might not have been created yet",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Successfully get product",
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Get product failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextAuthRequest, context: Params) {
  return auth(async () => {
    try {
      if (isNoAuth(request.auth, true))
        return NextResponse.json(
          {
            message: "You need to signin to access this endpoint",
            reason: "Not authenticated",
          },
          { status: 401 }
        );

      const { product_id } = context.params;
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
            message: "Edit product failed, please check your input again",
            reason: validatedFields.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      let dataToUpdate: DataToUpdate = {
        name,
        description,
        price,
        category_id: +category_id!,
      };

      if (image) {
        const uploadFile = await fileUploader(image, {
          folder: "hipotesa-product",
        });
        dataToUpdate.image = uploadFile.data;
      }

      const data = await nullIfError(prisma.product.update)({
        where: {
          id: product_id,
        },
        data: dataToUpdate,
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Edit product failed, data not found",
            reason:
              "The product you're trying to update might not have been created yet",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Successfully edited product",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Edit product failed, please try again later",
          reason: (error as Error).message,
        },
        { status: 500 }
      );
    }
  })(request, context) as any;
}

export async function DELETE(request: NextAuthRequest, context: Params) {
  return auth(async () => {
    try {
      if (isNoAuth(request.auth, true))
        return NextResponse.json(
          {
            message: "You need to signin to access this endpoint",
            reason: "Not authenticated",
          },
          { status: 401 }
        );

      const { product_id } = context.params;

      const data = await nullIfError(prisma.product.delete)({
        where: {
          id: product_id,
        },
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Delete product failed, data not found",
            reason:
              "The product you're trying to delete might not have been created yet",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Successfully deleted product",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Get product failed, please try again later",
          reason: (error as Error).message,
        },
        { status: 500 }
      );
    }
  })(request, context) as any;
}
