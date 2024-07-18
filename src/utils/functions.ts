import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";

import { cloudinaryConfig } from "@/utils/configs/storage";

type AnyFunction = (...args: any[]) => any;
type Options = {
  tags?: string[];
  folder: string;
};
type UploadPromise = {
  message: string;
  data: string;
};

export const nullIfError =
  <Func extends AnyFunction>(func: Func) =>
  async (...args: Parameters<Func>) => {
    try {
      return await func(...args);
    } catch (err) {
      console.error(err);

      return null;
    }
  };

export const isNoAuth = (
  auth: Session | null,
  isAdmin: boolean = false
): boolean => {
  if (isAdmin) {
    if (auth) {
      return auth.user?.role !== "admin";
    }

    return true;
  } else if (auth) {
    return false;
  } else {
    return true;
  }
};

export const fileUploader = async (image: File, { tags, folder }: Options) => {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise<UploadPromise>((resolve, reject) => {
    cloudinaryConfig.uploader
      .upload_stream(
        {
          tags,
          resource_type: "auto",
          folder,
        },
        function (error, result) {
          if (error) {
            reject({
              message: error.message,
              data: null,
            });
            return;
          }
          resolve({
            message: "Success",
            data: result?.secure_url ?? "",
          });
        }
      )
      .end(buffer);
  });
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const constructQuery = <T>(request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let query = {
    take: 12,
  } as T;

  if (page) {
    const skip = (+page - 1) * 12;

    query = {
      ...query,
      skip,
    };
  }

  if (category) {
    query = {
      ...query,
      where: {
        category: {
          name: category,
        },
      },
    };
  }

  if (search) {
    query = {
      ...query,
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    };
  }

  return query;
};

export const transactionsQuery = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const user_id = searchParams.get("user_id");

  let query = {
    take: 12,
  } as Prisma.TransactionFindManyArgs;

  if (page) {
    const skip = (+page - 1) * 12;

    query = {
      ...query,
      skip,
    };
  }

  if (user_id) {
    query = {
      ...query,
      where: {
        user_id,
      },
    };
  }

  return query;
};
