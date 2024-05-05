import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/apis/products/api";

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.data.map((product) => (
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
  );
}
