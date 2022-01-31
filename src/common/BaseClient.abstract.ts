import lodash from "lodash";
import ms from "ms";
import querystring from 'querystring';
import { JsonClient, createJsonClient } from "restify-clients";
import { parse, format } from "url";
import {
  ApiRequestCallback,
  ApiRequestParams,
  ClientOptions, DefaultBaseClientOptions, ExtendedHeaderOptions
} from "../types";
import { FormattedError } from "../utils/formatted-error.utils";

const SUPPORTED_METHODS = ['get', 'head', 'post', 'put', 'patch', 'delete'];
const SUPPORTS_BODY = ['post', 'put', 'patch'];

export abstract class BaseClient {
  pathPrefix: string | undefined;
  apiOptions: DefaultBaseClientOptions;
  api: JsonClient;
  baseUrl: string;

  constructor(baseUrl: string, options: ClientOptions) {
    const { pathPrefix, apiOptions } = BaseClient.parseConstructorOptions(baseUrl, options);
    this.baseUrl = baseUrl;
    this.pathPrefix = pathPrefix;
    this.apiOptions = apiOptions;
    this.api = createJsonClient(this.apiOptions);
  }

  apiCall(options: ApiRequestParams, callback: ApiRequestCallback) {
    this._checkArgs(options);

    const formattedQs = options.qs ? `?${querystring.stringify(options.qs)}` : '';
    const opts = {
      path: this.pathPrefix + options.path + formattedQs,
      headers: Object.assign(this._extendedHeaders({ body: options.body, qs: options.qs }), options.headers)
    };

    const args = options.body
      ? [opts, options.body]
      : [opts];

    return this.api[options.method](...args, (err: Error, req: any, res: any, obj: any) => {
      return err
        ? callback(err)
        : callback(null, obj);
    });
  }

  static defaultOptions: DefaultBaseClientOptions;

  static parseConstructorOptions(baseUrl: string, options: ClientOptions) {
    const parsedUrl = parse(baseUrl);

    if (parsedUrl.hash || (parsedUrl.pathname !== parsedUrl.path))
      throw new Error('"Unclean" path is not supported: no query strings, hashes, etc.');

    return {
      pathPrefix: parsedUrl.pathname?.replace(/\/+$/g, ''),
      apiOptions: lodash.merge(
        { url: format({ protocol: parsedUrl.protocol, hostname: parsedUrl.hostname, port: parsedUrl.port }) },
        BaseClient.defaultOptions,
        options
      )
    };
  }

  _checkArgs(options: ApiRequestParams) {

    if (!SUPPORTED_METHODS.includes(options.method))
      throw new FormattedError('`method` argument must be one of `%j`, got `%j`', SUPPORTED_METHODS, options.method);

    if ((typeof options.path !== 'string') || (options.path.length < 1))
      throw new FormattedError('`path` argument must be non-empty string, got `%j`', options.path);

    if (!SUPPORTS_BODY.includes(options.method) && (options.body !== null))
      throw new FormattedError('`%s` does not support body: `%j` passed in, expected `null` (use `qs` param instead)', options.method, options.body);
  }

  _extendedHeaders(options: ExtendedHeaderOptions) {
    const reqId = (options.qs || {}).req_id || (options.body || {}).req_id || null;
    return reqId
      ? { 'x-request-id': reqId }
      : {};
  }

}


BaseClient.defaultOptions = {
  // Enable retries in establishing TCP connection
  // (this will not retry on HTTP errors).
  retry: {
    minTimeout: ms('1 second'),
    maxTimeout: ms('5 seconds'),
    retries: 3
  },

  headers: {
    'accept': 'application/json',
    'accept-encoding': 'gzip,deflate'
  }
};
