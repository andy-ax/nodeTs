/**
 * if-modified-since/Last-Modified 请求头/响应头
 *      传输文件时会将文件最后更新时间Last-Modified发送给前端
 *      下次前端请求文件时会将之前的最后更新时间作为if-modified-since传给后端做判断文件是否过期
 * if-none-match/ETag 同上，但if-modified-since/Last-Modified只能精确到秒
 *      而if-none-match/ETag使用特征串 但是Etag在分布式环境里，会给服务器造成压力
 * Expires: 设置一个时间戳，与客户端时间比对，如果在该时间戳内则不用更新文件 缺点在于依赖于客户端时间，并不准确
 * Cache-Control 设置超时时间，无需与客户端比对，需要HTTP1.1以上版本支持
 *
 * Cache-Control 与 Last-Modified的区别 Cache-Control设置超时时间，超过该时间，浏览器会自动获取新文件 Last-Modified 会一直比对文件最后更新时间，如果不一致则更新
 */
export declare class Cache {
    private static EXPIRES;
    /**
     * 设定超时时间
     * @param expires
     */
    static configExpires(expires: number): void;
    /**
     * 客户端的文件请求，判断客户端的文件时间戳是否与服务器端的文件时间戳一样
     * @param path
     * @param req
     * @param res
     */
    static checkModified(path: string, req: Request, res: Response): Promise<any>;
    /**
     * 根据etag判断文件是否已过期
     * @param path
     * @param req
     * @param res
     */
    static checkETag(path: string, req: Request, res: Response): Promise<void>;
    /**
     * 设置超时时间
     * @param path
     * @param res
     */
    static setExpires(path: string, res: Response): Promise<any>;
    /**
     * 设置catch-control
     * @param path
     * @param res
     */
    static setCacheControl(path: string, res: Response): Promise<any>;
    private static getHash;
}
