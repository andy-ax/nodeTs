export declare type mongodbConfig = {
    username: string;
    password: string;
    hostname: string;
    port: string;
};
export declare class Mongodb {
    private static dbUrl;
    static createMongoModel(schema: any, name: string): any;
    static setUrl(config: mongodbConfig): void;
}
