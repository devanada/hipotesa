import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import {
  TransactionSchema,
  transactionSchema,
} from "@/utils/types/transactions";
import { constructQuery, isNoAuth } from "@/utils/functions";
import { snap } from "@/utils/configs/payment";
import { prisma } from "@/utils/configs/db";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
  let transactionId = "";

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

    const { amount, cart_id } = (await request.json()) as TransactionSchema;
    const { name, email, id, address } = request.auth?.user!;

    const validatedFields = transactionSchema.safeParse({
      amount,
      cart_id,
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

    const data = await prisma.transaction.create({
      data: {
        user_id: id!,
        cart_id,
        amount,
        status: "PENDING",
        order: {
          create: {
            user_id: id!,
            status: "PENDING",
            total: amount,
          },
        },
      },
      include: {
        order: true,
        cart: {
          select: {
            cart_items: {
              select: {
                quantity: true,
                product: { select: { id: true, name: true, price: true } },
              },
            },
          },
        },
      },
    });
    const itemDetails = data.cart.cart_items.map((item) => {
      return {
        id: item.product.id,
        order_id: data.order?.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      };
    });
    transactionId = data.id;

    const result = await snap.createTransactionRedirectUrl({
      transaction_details: {
        order_id: data.order?.id,
        gross_amount: +amount,
      },
      item_details: itemDetails.map((item) => ({
        id: item.id,
        price: +item.price,
        quantity: item.quantity,
        name: item.name,
      })),
      customer_details: {
        first_name: name,
        email: email,
        billing_address: {
          first_name: name,
          email: email,
          address: address ?? "",
        },
        shipping_address: {
          first_name: name,
          email: email,
          address: address ?? "",
        },
      },
    });

    await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        payment_url: result,
      },
    });

    await prisma.orderItem.createMany({
      data: itemDetails.map((item) => ({
        order_id: item.order_id!,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    await prisma.cartItem.deleteMany({
      where: {
        id: data.cart_id,
      },
    });

    return NextResponse.json({
      message: "Successfully check out",
      data: result,
    });
  } catch (error) {
    console.log(error);

    const deleteOrder = prisma.order.delete({
      where: { transaction_id: transactionId },
    });
    const deleteTransaction = prisma.transaction.delete({
      where: { id: transactionId },
    });

    await prisma.$transaction([deleteOrder, deleteTransaction]);

    return NextResponse.json(
      {
        message: "Create transaction failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
});

export const GET = auth(async function GET(request) {
  try {
    let query = constructQuery<Prisma.TransactionFindManyArgs>(request);

    if (isNoAuth(request.auth)) {
      return NextResponse.json(
        {
          message: "You need to signin to access this endpoint",
          reason: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const user = request.auth?.user;
    const data = await prisma.transaction.findMany({
      ...query,
      where: {
        user_id: user?.role === "user" ? user?.id : undefined,
      },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            total: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      cacheStrategy: { ttl: 60 },
    });

    const totalCount = await prisma.transaction.count();
    const totalPages = Math.ceil(totalCount / 10);

    return NextResponse.json({
      message: "Successfully get transactions",
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
        message: "Get transactions failed, please try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
});
