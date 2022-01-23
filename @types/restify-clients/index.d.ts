//generate these files using the command: npx -p typescript tsc node_modules/restify-clients/lib/*.js --declaration --allowJs --emitDeclarationOnly --outDir @types/restify-clients


/**
 * creates an http request client. based on options passed in, will create one
 * of three existing clients: Http, String, or Json.
 * @public
 * @function createClient
 * @param    {Object} options      an options object
 * @param    {String} options.type 'http' | 'json' | 'string'
 * @returns  {HttpClient | JsonClient | StringClient}
 */
export function createClient(options: {
  type: string;
}): HttpClient | JsonClient | StringClient;
/**
 * creates a json httpclient.
 * @public
 * @function createJsonClient
 * @param    {Object}     options an options object
 * @returns  {JsonClient}         a json client
 */
export function createJsonClient(options: any): JsonClient;
/**
 * creates a string httpclient.
 * @public
 * @function createStringClient
 * @param    {Object}       options an options object
 * @returns  {StringClient}         a string client
 */
export function createStringClient(options: any): StringClient;
/**
 * creates a regular httpclient.
 * @public
 * @function createHttpClient
 * @param    {Object}     options an options object
 * @returns  {HttpClient}         an http client
 */
export function createHttpClient(options: any): HttpClient;
import HttpClient = require("restify-clients/lib/HttpClient");
import JsonClient = require("restify-clients/lib/JsonClient");
import StringClient = require("restify-clients/lib/StringClient");
export declare namespace bunyan {
  const serializers: any;
}
export { createJsonClient as createJSONClient, JsonClient };
