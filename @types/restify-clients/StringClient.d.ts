export = StringClient;
declare function StringClient(options: any): void;
declare class StringClient {
    constructor(options: any);
    contentMd5: any;
    gzip: any;
    post(options: any, body: any, callback: any, ...args: any[]): StringClient;
    put(options: any, body: any, callback: any, ...args: any[]): StringClient;
    patch(options: any, body: any, callback: any, ...args: any[]): StringClient;
    read(options: any, callback: any): StringClient;
    write(options: any, body: any, callback: any): StringClient;
    private parse;
    private _onResult;
}
