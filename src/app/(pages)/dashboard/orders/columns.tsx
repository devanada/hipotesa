"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { OrderStatus } from "@prisma/client";
import { toast } from "sonner";
import Link from "next/link";
import dayjs from "dayjs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { editTransaction } from "@/utils/actions/transactions";
import { OrderExtend } from "@/utils/types/transactions";

export const columns: ColumnDef<OrderExtend>[] = [
  {
    accessorKey: "order.id",
    header: "Order ID",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Total</div>,
    cell: async ({ row }) => {
      const price = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "order.status",
    header: "Order Status",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Select
          defaultValue={data.order.status}
          onValueChange={async (val) => {
            const result = await editTransaction(data.id, {
              status: val as keyof typeof OrderStatus,
            });

            if (result?.reason) {
              toast.error(result.message, {
                description: JSON.stringify(result.reason),
              });
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {[...Object.keys(OrderStatus)].map((status) => (
              <SelectItem value={status} key={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const data = row.original;

      return dayjs(data.created_at).format("DD MMM YYYY");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/orders/${data.id}`}>
                See detail order
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
