import got, { Got, GotRequestFunction, OptionsOfJSONResponseBody } from 'got';
import querystring from 'querystring';
import {
  ApiRequestCallback,
  ApiRequestParams,
  BaseClientExtendedOptions,
  ErrorResponseBody,
  ExtendedHeaderOptions
} from "../types";
import { FormattedError } from "../utils/formatted-error.utils";

const SUPPORTS_BODY = ['post', 'put', 'patch'];

export abstract class BaseClient {
  private pathPrefix: string | undefined;
  private commonHeaders?: Record<string, string>;
  private baseUrl: string;
  private supportedMethods: { [methodName: string]: GotRequestFunction } = {};
  api: Got = got;

  constructor(baseUrl: string, options: BaseClientExtendedOptions) {
    this.baseUrl = baseUrl;
    this.pathPrefix = options.pathPrefix;
    this.commonHeaders = options.headers;
    this._fillSupportedMethods();
  }

  public get BaseUrl() { return this.baseUrl; }

  apiCall(options: ApiRequestParams, callback: ApiRequestCallback) {
    this._checkArgs(options);

    const formattedQs = options.qs ? `?${querystring.stringify(options.qs)}` : '';
    const authHeaders = this.commonHeaders ?
      Object.assign(this.commonHeaders, options.headers) : options.headers;
    const gotOptions: OptionsOfJSONResponseBody = {
      responseType: "json",
      headers: Object.assign(this._extendedHeaders({ body: options.body, qs: options.qs }), authHeaders),
      json: options.body ? options.body : undefined
    };
    this._fillSupportedMethods();
    return this.supportedMethods[options.method](`${this.baseUrl}${this.pathPrefix}${options.path}${formattedQs}`,
      gotOptions).then(response => {
        if (response.statusCode !== 200) {
          return callback(new Error('Status is not 200'));
        }
        if (response.body !== null && response.body !== undefined &&
          typeof response.body === 'object' &&
          (response.body as object).hasOwnProperty('status') &&
          (response.body as ErrorResponseBody).status !== 200) {
          return callback(response.body as ErrorResponseBody);
        }
        return callback(null, response.body);
      }).catch(error => {
        // console.log(error);
        // console.log(error.response.body);
        callback(error);
      });
  }

  private _fillSupportedMethods(): void {
    this.supportedMethods = {
      'get': this.api.get,
      'head': this.api.head, 'post': this.api.post,
      'put': this.api.put, 'patch': this.api.patch,
      'delete': this.api.delete
    };
  }

  private _checkArgs(options: ApiRequestParams) {

    if (!this.supportedMethods[options.method])
      throw new FormattedError('`method` argument must be one of `%j`, got `%j`', this.supportedMethods, options.method);

    if ((typeof options.path !== 'string') || (options.path.length < 1))
      throw new FormattedError('`path` argument must be non-empty string, got `%j`', options.path);

    if (!SUPPORTS_BODY.includes(options.method) && (options.body !== null))
      throw new FormattedError('`%s` does not support body: `%j` passed in, expected `null` (use `qs` param instead)', options.method, options.body);
  }

  private _extendedHeaders(options: ExtendedHeaderOptions) {
    const reqId = (options.qs || {}).req_id || (options.body || {}).req_id || null;
    return reqId
      ? { 'x-request-id': reqId }
      : {};
  }
}
