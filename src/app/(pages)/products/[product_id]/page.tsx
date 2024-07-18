import Image from "next/image";
import Link from "next/link";

import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getProductById } from "@/utils/apis/products";
import { handleAddItem } from "@/utils/actions/carts";
import { formatCurrency } from "@/utils/functions";
import { auth } from "@/auth";

interface Params {
  product_id: string;
}

export default async function Page({
  params: { product_id },
}: {
  params: Params;
}) {
  const product = await getProductById(product_id);
  const session = await auth();

  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 md:gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <Image
            src={product.data.image ?? ""}
            alt={product.data.name}
            width={600}
            height={600}
            priority
            className="mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-xl object-contain"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                New Product
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {product.data.name}
              </h1>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <span className="text-sm font-medium">Category</span>
                <Link
                  className={
                    (badgeVariants({ variant: "outline" }),
                    "text-lg font-semibold")
                  }
                  href={`/products?category=${product.data.category.name}`}
                >
                  {product.data.category.name}
                </Link>
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">Price</span>
                <span className="text-3xl font-bold">
                  {formatCurrency(+product.data.price)}
                </span>
              </div>
            </div>
            {session?.user?.role === "user" ? (
              <form action={handleAddItem} className="w-full">
                <Input
                  type="hidden"
                  name="product_id"
                  value={product.data.id}
                />
                <Button type="submit" size="lg" className="w-full">
                  Add to Cart
                </Button>
              </form>
            ) : null}
          </div>
        </div>
      </section>
      <section className="w-full py-12 bg-muted mb-8">
        <div className="grid gap-6 md:gap-8 px-4 md:px-6">
          <div className="grid gap-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Product Details
            </h2>
            <div className="grid gap-4 text-sm leading-loose whitespace-pre-wrap">
              <p>{product.data.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
