"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { OrderItem } from "@/utils/apis/orders/type";

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "product.image",
    header: "Image",
    cell: async ({ row }) => {
      const data = row.original;
      return (
        <Image
          alt={data.product.name}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={data.product.image ?? "/placeholder.svg"}
          width="64"
        />
      );
    },
  },
  {
    accessorKey: "product.name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Total</div>,
    cell: async ({ row }) => {
      const data = row.original;

      const price = parseFloat(data.price) * data.quantity;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
