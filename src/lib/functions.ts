import { NextRequest } from "next/server";
import { Session } from "next-auth";

import { cloudinaryConfig } from "@/lib/storage";

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

  let query = {
    take: 10,
  } as T;

  if (page) {
    const skip = (+page - 1) * 10;

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

  return query;
};
