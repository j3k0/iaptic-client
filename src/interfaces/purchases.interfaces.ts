import { JsonClient } from "restify-clients";
import { ApiCustomerPurchases, ApiCustomerSummary, DefaultBaseClientOptions, GetCustomerPurchasesCallback, GetCustomersBulkInfoCallback, GetCustomersBulkInfoParams, Paginated } from "../types";


export interface IPurchasesClient {
  api: JsonClient;
  baseUrl: string;
  pathPrefix: string | undefined;
  apiOptions: DefaultBaseClientOptions;
  getCustomerPurchases(applicationUsername: string, cb: GetCustomerPurchasesCallback): void;
  getCustomersBulkInfo(params: GetCustomersBulkInfoParams, cb: GetCustomersBulkInfoCallback): void;
}
