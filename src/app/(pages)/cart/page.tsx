import Link from "next/link";
import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import CartItem from "@/components/cart-item";

import { handleCreateTransaction } from "@/utils/actions/transactions";
import { formatCurrency } from "@/utils/functions";
import { getCart } from "@/utils/apis/carts";

export default async function Page() {
  const { data } = await getCart();

  function calculateTotal() {
    const total = data.cart_items
      .map((item) => {
        return +item.product.price * item.quantity;
      })
      .reduce((a, b) => a + b, 0);

    return total;
  }

  return (
    <div className="w-full mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-8">
        <div className="grid gap-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <div className="grid gap-6">
            {data.cart_items.map((item) => (
              <CartItem data={item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Total</h2>
            <div className="text-2xl font-bold">
              {formatCurrency(calculateTotal())}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "flex-1",
              })}
              href="/products"
            >
              Continue Shopping
            </Link>
            <form className="flex-1" action={handleCreateTransaction}>
              <Button className="w-full">Proceed to Checkout</Button>
              <input type="hidden" name="amount" value={calculateTotal()} />
              <input type="hidden" name="cart_id" value={data.id} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
