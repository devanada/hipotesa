import { NextResponse } from "next/server";

import { CartSchema, cartSchema } from "@/lib/types/cart";
import { isNoAuth, nullIfError } from "@/lib/functions";
import { NextAuthRequest } from "@/lib/types/api";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

interface Params {
  params: { item_id: string };
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

      const { quantity } = (await request.json()) as CartSchema;
      const { item_id } = context.params;

      const validatedFields = cartSchema.safeParse({
        quantity,
      });

      if (!validatedFields.success) {
        return NextResponse.json(
          {
            message: "Update item failed, please check your input again",
            reason: validatedFields.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      const data = await nullIfError(prisma.cartItem.update)({
        where: {
          id: +item_id,
        },
        data: { quantity: { increment: quantity } },
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Edit item failed, data not found",
            reason:
              "The item you're trying to update might not have been created yet",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Successfully updated item",
        data: null,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Update item failed, please try again later",
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
      if (isNoAuth(request.auth))
        return NextResponse.json(
          {
            message: "You need to signin to access this endpoint",
            reason: "Not authenticated",
          },
          { status: 401 }
        );

      const { item_id } = context.params;

      const data = await nullIfError(prisma.cartItem.delete)({
        where: {
          id: +item_id,
        },
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Delete item failed, data not found",
            reason:
              "The item you're trying to delete might not have been added to cart yet",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Successfully deleted item from cart",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Delete item failed, please try again later",
          reason: (error as Error).message,
        },
        { status: 500 }
      );
    }
  })(request, context) as any;
}
