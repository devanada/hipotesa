import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import Form from "./form";

import { getCategories } from "@/utils/apis/categories/api";
import { getProductById } from "@/utils/apis/products/api";

export default async function Page({
  params,
}: {
  params: { product_id: string };
}) {
  const { data } = await getProductById(params.product_id);
  const { data: categories } = await getCategories();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "icon",
              className: "h-7 w-7",
            })}
            href="/dashboard/products"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create a Product
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="reset" form="create-form">
              Discard
            </Button>
            <Button size="sm" type="submit" form="create-form">
              Save Product
            </Button>
          </div>
        </div>
        <Form data={data} categories={categories} />
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" type="reset" form="create-form">
            Discard
          </Button>
          <Button size="sm" type="submit" form="create-form">
            Save Product
          </Button>
        </div>
      </div>
    </main>
  );
}
