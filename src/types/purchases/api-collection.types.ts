import { ApiTransaction } from "./api-transactions.types";

// import { CancelationReason, Platform, PriceConsentStatus, RenewalIntent } from "../api-types";
// import { ISODate } from "../../basic";
// export interface ApiPurchase {
//   platform: Platform;
//   productId: string;
//   purchaseId: string;
//   sandbox?: boolean;
//   isTrialPeriod?: boolean;
//   isBillingRetryPeriod?: boolean;
//   renewalIntent?: RenewalIntent;
//   priceConsentStatus?: PriceConsentStatus;
//   cancelationReason?: CancelationReason;
//   purchaseDate?: ISODate;
//   lastRenewalDate?: ISODate;
//   expirationDate?: ISODate;
//   renewalIntentChangeDate?: ISODate;
//   latestReceipt?: any;
//   canRefresh?: boolean;
//   quantity?: number;
//   isExpired? : boolean;
// }

export type ApiPurchase = ApiTransaction & {
  canRefresh?: boolean;
  isExpired?: boolean;
}

export interface ApiCollection {
  [productId: string]: ApiPurchase;
}
