export = JsonClient;
declare function JsonClient(options: any): void;
declare class JsonClient {
    constructor(options: any);
    _super: any;
    _safeStringify: any;
    write(options: any, body: any, callback: any): any;
    private parse;
}
