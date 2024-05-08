import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getProducts } from "@/lib/apis/products/api";
import { getCategories } from "@/lib/apis/categories/api";
import Link from "next/link";

export default async function Page() {
  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();

  return (
    <div className="space-y-3 py-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Link
                      className="text-2xl font-semibold text-center"
                      href={`/products?category=${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="font-medium text-3xl">Latest Products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {products.map((product) => (
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
    </div>
  );
}
