export declare type mongodbConfig = {
    url: string;
    port: string;
};
export declare class Mongodb {
    private static dbUrl;
    private db;
    private status;
    connect(): void;
    static createMongoModel(schema: any, name: string): any;
    static setUrl(config: mongodbConfig): void;
}
