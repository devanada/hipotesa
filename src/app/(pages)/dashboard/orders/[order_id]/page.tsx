import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/data-table";

import { getTransactionById } from "@/utils/apis/transactions";
import { formatCurrency } from "@/utils/functions";
import { columns } from "./columns";

interface Params {
  order_id: string;
}

export default async function Page({
  params: { order_id },
}: {
  params: Params;
}) {
  const { data } = await getTransactionById(order_id);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "icon",
              className: "h-7 w-7",
            })}
            href="/dashboard/orders"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Order Detail
          </h1>
        </div>
        <p>
          Transaction Date: {dayjs(data.created_at).format("MMMM DD, YYYY")}
        </p>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-3 lg:gap-8">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            <CardDescription>Customer information</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-medium">{data.user.name}</p>
            <Link
              className="text-blue-600 underline"
              href={`mailto:${data.user.email}`}
            >
              {data.user.email}
            </Link>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Shipping address</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>{data.user.address}</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Transaction Detail</CardTitle>
            <CardDescription>Details about transaction</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex items-center">
              <p>Transaction status</p>
              <p className="ml-auto">{data.status}</p>
            </div>
            <div className="flex items-center">
              <p>Order status</p>
              <p className="ml-auto">{data.order.status}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid items-start gap-4 lg:gap-8">
        <Suspense
          fallback={
            <DataTable
              columns={columns}
              data={[]}
              title="Products"
              description="List of product that user bought"
              showButton={false}
            />
          }
        >
          <DataTable
            columns={columns}
            data={data.order.items}
            title="Products"
            description="List of product that user bought"
            showButton={false}
          />
        </Suspense>
      </div>
      <div className="grid items-start gap-4 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>Details payment</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <p>Subtotal</p>
              <p className="ml-auto">{formatCurrency(+data.amount)}</p>
            </div>
            <Separator />
            <div className="flex items-center font-medium">
              <p>Total</p>
              <p className="ml-auto">{formatCurrency(+data.amount)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
