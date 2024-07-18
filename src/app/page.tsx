import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getProducts } from "@/utils/apis/products";
import { formatCurrency } from "@/utils/functions";

export default async function Page() {
  const { data: products } = await getProducts();

  async function handleSearch(formData: FormData) {
    "use server";

    redirect(`/products?search=${formData.get("search")}`);
  }

  return (
    <>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/high-end-pc-2.png"
              width={600}
              height={600}
              alt="Hero Product"
              className="mx-auto aspect-square rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Unleash Your Computing Power
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Discover the latest and greatest computer hardware at Hipotesa
              Store. Upgrade your setup and experience unparalleled performance.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Link href="#">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                className="md:basis-1/3 lg:basis-1/4"
                key={product.id}
              >
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      alt={product.name}
                      className="aspect-square overflow-hidden rounded-xl object-cover"
                      height="300"
                      src={product.image ?? "/placeholder.svg"}
                      width="300"
                    />
                  </Link>
                  <div className="space-y-1">
                    <Link
                      className="text-xl font-bold"
                      href={`/products/${product.id}`}
                    >
                      {product.name}
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400">
                      {formatCurrency(+product.price)}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className="w-full py-12">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Find the Perfect Tech for Your Needs
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover the latest and greatest computer hardware at Hipotesa
              Store. Upgrade your setup and experience unparalleled performance.
            </p>
          </div>
          <form className="flex space-x-2" action={handleSearch}>
            <Input
              className="flex-1"
              name="search"
              placeholder="Search for products..."
              type="search"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      </section>
    </>
  );
}
