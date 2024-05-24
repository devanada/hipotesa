import { Suspense } from "react";

import DataTable from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getTransactions } from "@/utils/apis/transactions";
import { SearchParams } from "@/utils/types/api";
import { columns } from "./columns";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { data, metadata } = await getTransactions(searchParams);
  const pageNumber = searchParams["page"] ?? "1";

  return (
    <div>
      <Suspense
        fallback={
          <DataTable
            columns={columns}
            data={[]}
            title="Order"
            description="Manage your orders"
            showButton={false}
          />
        }
      >
        <DataTable
          columns={columns}
          data={data}
          title="Order"
          description="Manage your orders"
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
                aria-disabled={+pageNumber === metadata?.totalPages}
                tabIndex={+pageNumber === metadata?.totalPages ? -1 : undefined}
                className={
                  +pageNumber === metadata?.totalPages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Suspense>
    </div>
  );
}
