"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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

import { OrderExtend } from "@/lib/apis/orders/type";
import { OrderStatus } from "@prisma/client";
import { editTransaction } from "@/lib/actions/transactions";

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
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const data = row.original;

      return dayjs(data.created_at).format("DD MMM YYYY");
    },
  },
];
