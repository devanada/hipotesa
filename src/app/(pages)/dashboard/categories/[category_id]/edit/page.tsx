import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import Form from "./form";

import { getCategoryById } from "@/utils/apis/categories/api";

export default async function Page({
  params,
}: {
  params: { category_id: string };
}) {
  const { data } = await getCategoryById(params.category_id);

  return (
    <main className="w-full grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="w-full mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "icon",
              className: "h-7 w-7",
            })}
            href="/dashboard/categories"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create a Category
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="reset" form="create-form">
              Discard
            </Button>
            <Button size="sm" type="submit" form="create-form">
              Save Category
            </Button>
          </div>
        </div>
        <Form data={data} />
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" type="reset" form="create-form">
            Discard
          </Button>
          <Button size="sm" type="submit" form="create-form">
            Save Category
          </Button>
        </div>
      </div>
    </main>
  );
}
