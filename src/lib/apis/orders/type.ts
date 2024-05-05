import { OrderStatus, Transaction } from "@prisma/client";

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
