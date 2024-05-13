"use client";

import { useCallback, useMemo } from "react";
import { Trash } from "lucide-react";
import { debounce } from "lodash";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CartItem as ItemType } from "@/utils/apis/carts/type";
import { removeItem, editItem } from "@/utils/actions/carts";

interface Props {
  data: ItemType;
}

const CartItem = ({ data }: Props) => {
  const getSuggestions = useCallback(async function (quantity: number) {
    const result = await editItem(String(data.id), { quantity });

    if (result?.reason) {
      toast.error(result.message, {
        description: JSON.stringify(result.reason),
      });
    }
  }, []);

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 500),
    [getSuggestions]
  );

  return (
    <div
      className="grid grid-cols-[100px_1fr_auto] items-center gap-6"
      key={data.id}
    >
      <Image
        alt={data.product.name}
        className="rounded-lg object-cover aspect-square"
        height={100}
        src={data.product.image ?? "/placeholder.svg"}
        width={100}
        priority
      />
      <div className="grid gap-1">
        <h3 className="font-medium">{data.product.name}</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            className="w-20 text-center"
            defaultValue={data.quantity}
            min="1"
            type="number"
            onChange={(e) => getSuggestionsDebounce(e.target.valueAsNumber)}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={async () => {
              const result = await removeItem(String(data.id));

              if (result?.reason) {
                toast.error(result.message, {
                  description: JSON.stringify(result.reason),
                });
              }
            }}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        <div className="text-lg font-medium">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(+data.product.price * data.quantity)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
