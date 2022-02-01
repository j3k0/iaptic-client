import { config } from "../../../config";

import {
  ApiCustomerPurchases,
  ApiCustomerSummary, ApplicationUserNameArray, ClientOptions,
  GetCustomerPurchasesCallback,
  GetCustomersBulkInfoCallback, GetCustomersBulkInfoParams,
  Paginated, PagingParam
} from "../../types";
import { BaseClient } from "../../common/BaseClient.abstract";
import { ICustomersClient } from "../interfaces/CustomersClient.interfaces";
import { base64 } from "../../utils/helper";

/**
 * class CustomersClient
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
export class CustomersClient extends BaseClient implements ICustomersClient {

  /**
   * constructor
   *
   * @param options ClientOptions
   */
  constructor(options: ClientOptions) {
    super(options.url ? options.url.toString() : config.url, {
      pathPrefix: config.V2.pathPrefix,
      headers: { Authorization: `Basic ${base64(options.appName + ':' + options.secretKey)}` }
    });
  }

  /**
   * Get customer purchases
   *
   * @param applicationUsername - string application-username
   * @param cb - callback method for getting the data.
   * @returns - void
   */
  getCustomerPurchases(applicationUsername: string, cb: GetCustomerPurchasesCallback): void {

    if (applicationUsername === null || applicationUsername === '' || applicationUsername === undefined) {
      return cb(new Error("UserId parameter is required to be non-null and non-empty"));
    }

    if (typeof applicationUsername !== 'string')
      return cb(new Error("applicationUsername parameter should be a string"));

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
   *
   * @param params - GetCustomersBulkInfoParams => limit, skip, applicationUsername
   * @param cb - callback method for getting the data.
   */
  getCustomersBulkInfo(params: GetCustomersBulkInfoParams, cb: GetCustomersBulkInfoCallback): void {

    const isApplicationUsersExist = (variableToCheck: any): variableToCheck is ApplicationUserNameArray =>
      (variableToCheck as ApplicationUserNameArray).applicationUsername !== undefined;

    const isPagingParam = (variableToCheck: any): variableToCheck is PagingParam =>
      (variableToCheck as PagingParam).limit !== undefined;

    const buildBulkQuerystring = (params: GetCustomersBulkInfoParams) => {
      if (isApplicationUsersExist(params) && params.applicationUsername?.length > 0) {
        return {
          applicationUsername: params.applicationUsername?.map((name, i) => encodeURIComponent(name)).join(',')
        };
      } else if (isPagingParam(params) && params.limit > 0) {
        params.skip = params.skip || 0;
        return params;
      }
      return null;
    }
    const qs = buildBulkQuerystring(params);
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
