import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import { buttonVariants } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getTransactions } from "@/utils/apis/transactions";
import { SearchParams } from "@/utils/types/api";
import { getUserById } from "@/utils/apis/users";
import { columns } from "./columns";

interface Params {
  user_id: string;
}

export default async function Page({
  params: { user_id },
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { data } = await getUserById(user_id);
  const { data: orders, metadata } = await getTransactions({ user_id });
  const pageNumber = searchParams["page"] ?? "1";

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
            href="/dashboard/users"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            User Detail
          </h1>
        </div>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-3 lg:gap-8">
        <Card className="h-full col-span-2">
          <CardHeader>
            <CardTitle>User</CardTitle>
            <CardDescription>User information</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex items-center">
              <p>Name</p>
              <p className="ml-auto font-medium">{data.name}</p>
            </div>
            <div className="flex items-center">
              <p>Email</p>
              <Link
                className="ml-auto text-blue-600 underline"
                href={`mailto:${data.email}`}
              >
                {data.email}
              </Link>
            </div>
            <div className="flex items-center">
              <p>Role</p>
              <p className="ml-auto font-medium capitalize">{data.role}</p>
            </div>
            <div className="flex items-center">
              <p>Address</p>
              <p className="ml-auto font-medium">{data.address ?? "-"}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Member Activity</CardTitle>
            <CardDescription>Details about member activity</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex items-center">
              <p>Member since</p>
              <p className="ml-auto">
                {dayjs(data.created_at).format("MMMM DD, YYYY")}
              </p>
            </div>
            <div className="flex items-center">
              <p>Total orders</p>
              <p className="ml-auto">{metadata?.total_count}</p>
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
              title="Order History"
              description="List of order history that user bought"
              showButton={false}
            />
          }
        >
          <DataTable
            columns={columns}
            data={orders}
            title="Order History"
            description="List of order history that user bought"
            showButton={false}
          />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${+pageNumber - 1}`}
                  aria-disabled={+pageNumber == 1}
                  tabIndex={+pageNumber == 1 ? -1 : undefined}
                  className={
                    +pageNumber == 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`?page=${+pageNumber + 1}`}
                  aria-disabled={+pageNumber === metadata?.total_pages}
                  tabIndex={
                    +pageNumber === metadata?.total_pages ? -1 : undefined
                  }
                  className={
                    +pageNumber === metadata?.total_pages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Suspense>
      </div>
    </main>
  );
}
