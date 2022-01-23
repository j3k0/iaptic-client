import { ParsedUrlQueryInput } from 'querystring';
import { ApiCustomerPurchases, ApiCustomerSummary, Paginated } from '.';

export type ClientOptions = {
  protocol: string,
  hostname: string,
  port: number,
  pathnamePrefix?: string,
  clientId?: string,
  secret?: string,
  agent?: string
}

export type ExtendedHeaderOptions = { body: any, qs: any }


export type DefaultBaseClientOptions = {
  // Enable retries in establishing TCP connection
  // (this will not retry on HTTP errors).
  retry: { minTimeout: any; maxTimeout: any; retries: number; };
  headers: { accept: string; 'accept-encoding': string; };
}

export type ApiRequestParams = {
  method: string,
  path: string,
  headers: object | Record<string, unknown> | null,
  body: object | string | number | null,
  qs: ParsedUrlQueryInput | null
}

export type ApiRequestCallback = (err: Error | null, result?: any) => void;
export type GetCustomerPurchasesCallback = (err: Error | null, data?: ApiCustomerPurchases) => void;
export type GetCustomersBulkInfoCallback = (err: Error | null, data?: Paginated<ApiCustomerSummary>) => void;

export type GetCustomersBulkInfoParams = {
  skip?: number;
  limit?: number;
  applicationUsername?: string[];
}
