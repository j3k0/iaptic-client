import { ProductType } from "./api-types";
import { AmountUSD } from "./basic.types";

export interface ApiProduct {
  productId: string;
  productType?: ProductType;
  amountUSD?: AmountUSD;
  numTransactions: number;
}
