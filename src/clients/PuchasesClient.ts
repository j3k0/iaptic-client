import { IPurchasesClient } from "../interfaces/purchases.interfaces";
import { ApiCustomerPurchases, ApiCustomerSummary, ClientOptions, GetCustomerPurchasesCallback, GetCustomersBulkInfoCallback, GetCustomersBulkInfoParams, Paginated } from "../types";
import { BaseClient } from "./BaseClient.abstract";

/**
 * class PurchasesClient
 * constructor requires options as
 * {
 *  protocol: 'http',
 *  hostname: 'domain.com',
 *  port: 80,
 *  pathnamePrefix?: '/v2/customers',
 *  clientId?: 'my-client-id',
 *  secret?: 'secret key if exists',
 *  agent?: string
 * }
 */
export class PurchasesClient extends BaseClient implements IPurchasesClient {

  /**
   * constructor
   * @param options ClientOptions
   */
  constructor(options: ClientOptions) {
    super(`${options.protocol}://${options.hostname}:${options.port}${options.pathnamePrefix}`, options);

  }

  /**
   * Get customer purchases
   * @param applicationUsername : string application-username
   * @param cb : callback method for getting the data.
   * @returns : void
   */
  getCustomerPurchases(applicationUsername: string, cb: GetCustomerPurchasesCallback): void {

    if (applicationUsername === null || applicationUsername === '' || applicationUsername === undefined) {
      return cb(new Error("UserId parameter is required to be non-null and non-empty"));
    }

    this.apiCall({
      method: 'get', path: `/${applicationUsername}/purchases`,
      qs: null, headers: {}, body: null
    }, (err, result) => {
      if (err) {

        return cb(err);
      }

      cb(null, result as ApiCustomerPurchases);

    });
  }

  /**
   * Get bulk information about your customers.
   * @param params : GetCustomersBulkInfoParams => limit, skip, applicationUsername
   * @param cb : callback method for getting the data.
   * @returns : void
   */
  getCustomersBulkInfo(params: GetCustomersBulkInfoParams, cb: GetCustomersBulkInfoCallback): void {
    params.skip = params.skip || 0;
    const qs = params.applicationUsername && params.applicationUsername.length > 0 ?
      Object.assign({
        applicationUsername: params.applicationUsername.map((name, i) => encodeURIComponent(name)).join(',')
      }) :
      (params.limit !== 0 && params.limit !== undefined ? { limit: params.limit, skip: params.skip } : null);

    if (qs === null) {
      return cb(new Error("skip and limit are disregarded when 'applicationUsername' parameter" +
        " is specified, else skip and limit should be defined."));
    }
    this.apiCall({
      method: 'get', path: '/',
      qs: qs, headers: {}, body: null
    }, (err, result) => {
      if (err) {

        return cb(err);
      }

      cb(null, result as Paginated<ApiCustomerSummary>);
    });
  }

}
