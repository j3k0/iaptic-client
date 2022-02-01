
import {
  GetCustomerPurchasesCallback, GetCustomersBulkInfoCallback,
  GetCustomersBulkInfoParams
} from "../../types";

export interface ICustomersClient {
  getCustomerPurchases(applicationUsername: string, cb: GetCustomerPurchasesCallback): void;
  getCustomersBulkInfo(params: GetCustomersBulkInfoParams, cb: GetCustomersBulkInfoCallback): void;
}

