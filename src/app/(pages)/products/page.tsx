import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getCategories } from "@/utils/apis/categories";
import { getProducts } from "@/utils/apis/products";
import { SearchParams } from "@/utils/types/api";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { data, metadata } = await getProducts(searchParams);
  const { data: categories } = await getCategories();

  const pageNumber = searchParams["page"] ?? "1";
  const category = searchParams["category"] ?? "";
  const search = searchParams["search"] ?? "";

  async function handleSearch(formData: FormData) {
    "use server";

    redirect(`/products?search=${formData.get("search")}`);
  }

  return (
    <>
      <div className="flex items-center gap-4 justify-end mt-8">
        <Select
          defaultValue={category as string}
          onValueChange={async (value) => {
            "use server";

            redirect(`/products?category=${value}`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.name}`}
                passHref
              >
                <SelectItem value={category.name}>{category.name}</SelectItem>
              </Link>
            ))}
          </SelectContent>
        </Select>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <form className="flex space-x-2" action={handleSearch}>
            <Input
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Search products..."
              defaultValue={search}
              name="search"
              type="search"
            />
          </form>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            href={`/products/${product.id}`}
            className="w-full"
            aspectRatio="portrait"
            width={250}
            height={330}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${+pageNumber - 1}`}
              aria-disabled={+pageNumber == 1}
              tabIndex={+pageNumber == 1 ? -1 : undefined}
              className={
                +pageNumber == 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`?page=${+pageNumber + 1}`}
              aria-disabled={
                +pageNumber === metadata?.total_pages ||
                metadata?.total_pages === 0
              }
              tabIndex={
                +pageNumber === metadata?.total_pages ||
                metadata?.total_pages === 0
                  ? -1
                  : undefined
              }
              className={
                +pageNumber === metadata?.total_pages ||
                metadata?.total_pages === 0
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
