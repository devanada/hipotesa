import { Suspense } from "react";

import DataTable from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { SearchParams } from "@/utils/types/api";
import { getUsers } from "@/utils/apis/users";
import { columns } from "./columns";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
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
  );
}
