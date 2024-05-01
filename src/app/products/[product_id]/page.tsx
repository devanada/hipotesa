import Image from "next/image";
import { TagIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";

import { getDetailProduct } from "@/lib/apis/products/api";
import { formatCurrency } from "@/lib/functions";

interface Params {
  product_id: string;
}

export default async function Page({
  params: { product_id },
}: {
  params: Params;
}) {
  const product = await getDetailProduct(product_id);

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
      <div className="grid gap-6">
        <Image
          src={product.data.image ?? ""}
          alt={product.data.name}
          width={600}
          height={600}
          priority
          className="rounded-lg object-cover w-full aspect-square"
        />
        <div className="grid gap-2">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <TagIcon className="w-4 h-4" />
            <Link
              className={badgeVariants({ variant: "outline" })}
              href={`/products?category=${product.data.category.name}`}
            >
              {product.data.category.name}
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-charcoal dark:text-antique-white">
            {product.data.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl text-charcoal/75 dark:text-antique-white/75">
              {formatCurrency(+product.data.price)}
            </span>
            <Button size="lg">Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 text-sm leading-loose text-charcoal dark:text-antique-white">
        <p>{product.data.description}</p>
      </div>
    </div>
  );
}
