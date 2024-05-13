import { OrderStatus, Transaction } from "@prisma/client";
import * as z from "zod";

export interface OrderExtend extends Transaction {
  user: {
    email: string;
    name: string;
    address?: string;
  };
  order: {
    id: string;
    status: OrderStatus;
    total: string;
    items: OrderItem[];
  };
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    image: string;
  };
}

export const transactionSchema = z.object({
  amount: z.string({
    required_error: "Amount is required",
  }),
  cart_id: z.number({
    required_error: "Cart ID is required",
  }),
});
export const orderSchema = z.object({
  status: z.enum(
    ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED", "RETURNED"],
    {
      required_error: "Status is required",
    }
  ),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
export type OrderSchema = z.infer<typeof orderSchema>;

type TransactionStatus =
  | "capture"
  | "settlement"
  | "pending"
  | "deny"
  | "cancel"
  | "expire"
  | "failure"
  | "refund"
  | "partial_refund"
  | "authorize";

export interface Notification {
  transaction_time: string;
  transaction_status: TransactionStatus;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  settlement_time: string;
  payment_type: "gopay";
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status: "accept" | "deny";
  currency: string;
}
