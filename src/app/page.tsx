import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-[1fr_550px] lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover the Latest Tech at Our Online Store
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Browse our wide selection of cutting-edge computers, laptops,
                and accessories. Find the perfect tech to power your digital
                life.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link className={buttonVariants({ size: "lg" })} href="/products">
                Shop Now
              </Link>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src="/computer.svg"
            width="550"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Find the Perfect Tech for Your Needs
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Browse our wide selection of computers, laptops, and accessories
              to find the perfect tech to power your digital life.
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
