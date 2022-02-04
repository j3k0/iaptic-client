import { ParsedUrlQueryInput } from 'querystring';
import { ApiCustomerPurchases, ApiCustomerSummary, Paginated } from '.';

export type ClientOptions = {
  appName: string,
  secretKey: string,
  url?: URL | string
}

export type ExtendedHeaderOptions = { body: any, qs: any }

export type BaseClientExtendedOptions = {
  pathPrefix: string;
  headers?: Record<string, string>;
}

export type ApiRequestParams = {
  method: string,
  path: string,
  headers: object | Record<string, string> | null,
  body: Record<string, unknown> | null,
  qs: ParsedUrlQueryInput | null
}

export type ApiRequestCallback = (err: Error | ErrorResponseBody | null, result?: any) => void;
export type GetCustomerPurchasesCallback = (err: Error | ErrorResponseBody | null, data?: ApiCustomerPurchases) => void;
export type GetCustomersBulkInfoCallback = (err: Error | ErrorResponseBody | null, data?: Paginated<ApiCustomerSummary>) => void;

export type ApplicationUserNameArray = {
  applicationUsername: string[];
}
export type PagingParam = {
  skip: number;
  limit: number;
};
export type GetCustomersBulkInfoParams = PagingParam | ApplicationUserNameArray;

export type ErrorResponseBody = {
  status: number;
  ok: boolean;
  code: string;
  message: string;
}

export type WebHookPost = ApiCustomerPurchases & {
  type: string;
  password: string
};
