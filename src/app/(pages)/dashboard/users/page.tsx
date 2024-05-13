import { Suspense } from "react";

import DataTable from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getUsers } from "@/utils/apis/users/api";
import { columns } from "./columns";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data, metadata } = await getUsers(searchParams);
  const pageNumber = searchParams["page"] ?? "1";

  return (
    <div>
      <Suspense
        fallback={
          <DataTable
            columns={columns}
            data={[]}
            title="User"
            description="Manage your users"
            showButton={false}
          />
        }
      >
        <DataTable
          columns={columns}
          data={data}
          title="User"
          description="Manage your users"
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
                aria-disabled={+pageNumber === metadata.totalPages}
                tabIndex={+pageNumber === metadata.totalPages ? -1 : undefined}
                className={
                  +pageNumber === metadata.totalPages
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
