import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { UserSchema, userBaseSchema, userSchema } from "@/utils/types/users";
import { constructQuery, fileUploader, isNoAuth } from "@/utils/functions";
import { prisma } from "@/utils/configs/db";
import { auth } from "@/auth";

interface DataToUpdate {
  name: string;
  address: string;
  image?: string;
}

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
    let query = constructQuery<Prisma.UserFindManyArgs>(request);

    if (isNoAuth(request.auth, true)) {
      return NextResponse.json(
        {
          message: "You need to signin to access this endpoint",
          reason: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const data = await prisma.user.findMany({
      ...query,
      cacheStrategy: { ttl: 60 },
    });

    const totalCount = await prisma.user.count();
    const totalPages = Math.ceil(totalCount / 10);

    return NextResponse.json({
      message: "Successfully get users",
      metadata: {
        total_count: totalCount,
        total_pages: totalPages,
      },
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

export const PUT = auth(async function PUT(request) {
  try {
    if (isNoAuth(request.auth)) {
      return NextResponse.json(
        {
          message: "You need to signin to access this endpoint",
          reason: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const checkImage = formData.get("image") as File;
    let image: File | undefined;

    if (checkImage.size !== 0) {
      image = checkImage;
    }

    const validatedFields = userBaseSchema.safeParse({
      name,
      address,
      image,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Edit profile failed, please check your input again",
          reason: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    let dataToUpdate: DataToUpdate = {
      name,
      address,
    };

    if (image) {
      const uploadFile = await fileUploader(image, {
        folder: "hipotesa-user",
      });
      dataToUpdate.image = uploadFile.data;
    }

    const data = await prisma.user.update({
      where: {
        id: request.auth?.user?.id,
      },
      data: dataToUpdate,
    });

    return NextResponse.json({
      message: "Successfully edited profile",
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Edit profile failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
});
