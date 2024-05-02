import { Product } from "@prisma/client";

export interface ProductExtend extends Product {
  category: {
    name: string;
  };
}
