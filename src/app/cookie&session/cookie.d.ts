declare type Option = {
    maxAge: number;
    domain: string;
    path: string;
    expires?: {
        toUTCString: () => string;
    };
    httpOnly: any;
    secure?: any;
};
declare type anyObject = {
    [key: string]: any;
};
export declare class Cookie {
    static option: Option;
    static cookies: any;
    req: any;
    res: any;
    cookie: any[];
    constructor(req: any, res: any);
    /**
     * 设置cookie头
     */
    setCookie(): void;
    /**
     * 检查设定的cookie是否存在
     * @param key
     * @param success
     * @param fail
     */
    checkCookie(key: string, success: Function, fail: Function): void;
    /**
     * 检查全部 cookie
     */
    checkAllCookie(): void;
    /**
     * option设置
     * @param {object} opt
     */
    static setOption(opt: Option): void;
    /**
     * 存储已配置的cookie
     * @param {string} key
     * @param {function} success
     * @param {function} fail
     */
    static cookieConfig(key: string, success: Function, fail: Function): void;
    /**
     * 将cookie切成对象
     * @param {string} cookie
     * @return {object}
     */
    static parseCookie(cookie: any): anyObject;
    /**
     * 创建cookie
     * @param {string} name
     * @param  val
     * @param {object} [opt]
     * @return {string}
     */
    static buildCookie(name: string, val: any, opt?: Option): string;
}
export {};
