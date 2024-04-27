import { NextResponse } from "next/server";

import { UserSchema, userSchema } from "@/lib/types/user";
import { isNoAuth, nullIfError } from "@/lib/functions";
import { NextAuthRequest } from "@/lib/types/api";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

interface Params {
  params: { user_id: string };
}

export async function GET(request: NextAuthRequest, context: Params) {
  return auth(async () => {
    try {
      const { user_id } = context.params;

      const data = await prisma.user.findFirst({
        where: {
          id: user_id,
        },
        cacheStrategy: { ttl: 60 },
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Get user failed, data not found",
            reason:
              "The user you're trying to retrieve might not have been created yet",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Successfully get user",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Get user failed, please try again later",
          reason: (error as Error).message,
        },
        { status: 500 }
      );
    }
  })(request, context) as any;
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

      const { user_id } = context.params;
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
            message: "Edit user failed, please check your input again",
            reason: validatedFields.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      const data = await nullIfError(prisma.user.update)({
        where: {
          id: user_id,
        },
        data: {
          name,
          email,
          address,
        },
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Edit user failed, data not found",
            reason:
              "The user you're trying to update might not have been created yet",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Successfully edited user",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Edit user failed, please try again later",
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

      const { user_id } = context.params;

      const data = await nullIfError(prisma.user.delete)({
        where: {
          id: user_id,
        },
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Delete user failed, data not found",
            reason:
              "The user you're trying to delete might not have been created yet",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Successfully deleted user",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Get user failed, please try again later",
          reason: (error as Error).message,
        },
        { status: 500 }
      );
    }
  })(request, context) as any;
}
