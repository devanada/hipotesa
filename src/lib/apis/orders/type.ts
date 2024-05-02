import { Transaction } from "@prisma/client";

export interface OrderExtend extends Transaction {
  order: {
    id: string;
    status: string;
    total: string;
  };
}
