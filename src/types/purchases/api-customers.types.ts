import { ISODate } from "./basic.types";
import { RenewalIntent } from "./api-types";
import { ApiCollection } from "./api-collection.types";
import { ApiTransaction } from "./api-transactions.types";

/** List of purchases for a customer */
export interface ApiCustomerPurchases {
  applicationUsername: string;
  purchases: ApiCollection;
}

/** List of purchases for a customer */
export interface ApiCustomerCollection {
  applicationUsername: string;
  collection: ApiCollection;
}

export interface ApiCustomerInfo {
  lastPurchaseId?: string;
  lastPurchaseDate?: ISODate;
  lastRenewalDate?: ISODate;
  expirationDate?: ISODate;
  activeSubscriber?: boolean;
  lapsedSubscriber?: boolean;
  renewalIntent?: RenewalIntent;
}

export interface ApiCustomerSummary {
  applicationUsername: string;
  customerInfo: ApiCustomerInfo;
  /** @deprecated Remove in API v3 */
  receiptIds?: ReadonlyArray<string>;
}

export interface ApiCustomerSubscription {
  applicationUsername: string;
  subscription?: ApiTransaction;
}


export interface ApiCustomerTransactions {
  applicationUsername: string;
  transactions: ReadonlyArray<ApiTransaction>;
}
