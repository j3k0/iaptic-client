import { Platform, ProductType } from "./api-types";
import { AmountUSD, ISODate } from "./basic.types";
import { ApiTransaction } from "./api-transactions.types";

export interface ApiReceipt {
  receiptId: string;
  platform: Platform;
  sandbox?: boolean;
  updatedAt?: ISODate;
  content?: any; // XXX what is in content?
  source?: any; // XXX what is in source?
  amountsMicros: {
    [currency: string]: number;
  };
  amountUSD: AmountUSD;
  numTransactions: number;
  data: {
    purchaseToken?: string; // XXX should be in content maybe?
    productId?: string;
    productType?: ProductType;
  },
}

export interface ApiReceiptTransactions {
  receiptId: string;
  transactions: Array<ApiTransaction>;
}
