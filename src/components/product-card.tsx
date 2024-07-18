import { Product } from "@prisma/client";
import { UrlObject } from "url";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "@/utils/functions";
import { cn } from "@/lib/utils";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  href: string | UrlObject;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ProductCard({
  product,
  href,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProductCardProps) {
  return (
    <div
      className={cn("space-y-3 flex flex-col justify-between", className)}
      {...props}
    >
      <Link className="overflow-hidden m-auto" href={href}>
        <Image
          src={product.image!}
          alt={product.name}
          width={width}
          height={height}
          priority
          className={cn(
            "h-auto w-auto object-contain m-auto",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </Link>
      <div className="space-y-1 text-sm">
        <Link className="font-medium leading-none" href={href}>
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">
          {formatCurrency(+product.price)}
        </p>
      </div>
    </div>
  );
}
