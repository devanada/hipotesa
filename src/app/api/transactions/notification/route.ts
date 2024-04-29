import { NextResponse } from "next/server";

import { Notification } from "@/lib/types/transactions";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export const POST = auth(async function GET(request) {
  const { order_id, transaction_status, fraud_status, ...data } =
    (await request.json()) as Notification;

  if (transaction_status == "capture") {
    if (fraud_status == "accept") {
      await prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          transaction: {
            update: {
              status: "COMPLETED",
            },
          },
        },
      });

      return NextResponse.json({
        message: "Transaction success",
        data,
      });
    }
  } else if (transaction_status == "settlement") {
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        transaction: {
          update: {
            status: "COMPLETED",
          },
        },
      },
    });

    return NextResponse.json({
      message: "Transaction success",
      data,
    });
  } else if (
    transaction_status == "cancel" ||
    transaction_status == "deny" ||
    transaction_status == "expire"
  ) {
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        transaction: {
          update: {
            status: "FAILED",
          },
        },
      },
    });

    return NextResponse.json({
      message: "Transaction failed",
      data,
    });
  } else if (transaction_status == "pending") {
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        transaction: {
          update: {
            status: "PENDING",
          },
        },
      },
    });

    return NextResponse.json({
      message: "Transaction pending",
      data,
    });
  }
});
