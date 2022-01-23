export = HttpClient;
declare function HttpClient(options: any): void;
declare class HttpClient {
    constructor(options: any);
    _inflightRequests: number;
    agent: any;
    appendPath: any;
    ca: any;
    checkServerIdentity: any;
    cert: any;
    ciphers: any;
    connectTimeout: any;
    requestTimeout: any;
    headers: any;
    log: any;
    followRedirects: any;
    maxRedirects: any;
    audit: {
        func: any;
        defaultEnabled: any;
    };
    key: any;
    name: any;
    passphrase: any;
    pfx: any;
    query: any;
    rejectUnauthorized: any;
    retry: boolean | {
        minTimeout: any;
        maxTimeout: any;
        retries: any;
    };
    signRequest: any;
    socketPath: any;
    url: {};
    path: string;
    _keep_alive: boolean;
    close(): void;
    del(options: any, callback: any): void;
    get(options: any, callback: any): void;
    head(options: any, callback: any): void;
    opts(options: any, callback: any): void;
    post(options: any, callback: any): void;
    put(options: any, callback: any): void;
    patch(options: any, callback: any): void;
    read(options: any, callback: any): void;
    basicAuth(username: any, password: any): HttpClient;
    request(opts: any, cb: any): void;
    private _options;
    /**
     * return number of currently inflight requests
     * @public
     * @method inflightRequests
     * @returns {Number}
    */
    public inflightRequests(): number;
    private _incrementInflightRequests;
    /**
     * decrement the number of currently inflight requests. also make sure we never
     * drop below 0, which would mean there's a bug in the way we're counting.
     * @public
     * @method inflightRequests
     * @returns {Number}
    */
    public _decrementInflightRequests(): number;
}
