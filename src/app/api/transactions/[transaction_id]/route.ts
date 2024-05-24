import { NextResponse } from "next/server";

import { OrderSchema, orderSchema } from "@/utils/types/transactions";
import { NextAuthRequest } from "@/utils/types/api";
import { isNoAuth } from "@/utils/functions";
import { prisma } from "@/utils/configs/db";
import { auth } from "@/auth";

interface Params {
  params: { transaction_id: string };
}

export async function GET(request: NextAuthRequest, context: Params) {
  return auth(async () => {
    try {
      if (isNoAuth(request.auth, true)) {
        return NextResponse.json(
          {
            message: "You need to signin to access this endpoint",
            reason: "Not authenticated",
          },
          { status: 401 }
        );
      }

      const { transaction_id } = context.params;

      const data = await prisma.transaction.findUnique({
        where: {
          id: transaction_id,
        },
        include: {
          user: {
            select: {
              email: true,
              name: true,
              address: true,
            },
          },
          order: {
            select: {
              id: true,
              total: true,
              status: true,
              items: {
                select: {
                  id: true,
                  quantity: true,
                  price: true,
                  product: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
        cacheStrategy: { ttl: 60 },
      });

      return NextResponse.json({
        message: "Successfully get transaction",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Get transaction failed, please try again later",
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
      if (isNoAuth(request.auth, true)) {
        return NextResponse.json(
          {
            message: "You need to signin to access this endpoint",
            reason: "Not authenticated",
          },
          { status: 401 }
        );
      }

      const { status } = (await request.json()) as OrderSchema;
      const { transaction_id } = context.params;

      const validatedFields = orderSchema.safeParse({
        status,
      });

      if (!validatedFields.success) {
        return NextResponse.json(
          {
            message: "Transaction failed, please check your input again",
            reason: validatedFields.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      const data = await prisma.order.update({
        where: {
          transaction_id: transaction_id,
        },
        data: {
          status,
        },
      });

      return NextResponse.json({
        message: "Successfully update transaction",
        data,
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Update transaction failed, please try again later",
          reason: (error as Error).message,
        },
        { status: 500 }
      );
    }
  })(request, context) as any;
}
