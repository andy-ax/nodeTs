"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const __1 = require("..");
const crypto = require("crypto");
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
class Cache {
    /**
     * 设定超时时间
     * @param expires
     */
    static configExpires(expires) {
        this.EXPIRES = expires;
    }
    /**
     * 客户端的文件请求，判断客户端的文件时间戳是否与服务器端的文件时间戳一样
     * @param path
     * @param req
     * @param res
     */
    static checkModified(path, req, res) {
        return new Promise((resolve, reject) => {
            let lastModified;
            __1.File.readFileMsg(path).then((stat) => {
                lastModified = stat.mtime.toUTCString();
                // @ts-ignore
                if (lastModified === req.headers['if-modified-since']) {
                    resolve(null);
                }
                else {
                    return __1.File.readFile(path);
                }
            }).then(str => {
                res.setHeader("Last-Modified", lastModified);
                resolve(str);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * 根据etag判断文件是否已过期
     * @param path
     * @param req
     * @param res
     */
    static checkETag(path, req, res) {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            __1.File.readFile(path).then((str) => {
                const hash = Cache.getHash(str);
                // @ts-ignore
                const noneMatch = req.headers['if-none-match'];
                if (hash === noneMatch) {
                    resolve();
                }
                else {
                    res.setHeader("ETag", hash);
                    reject(str);
                }
            });
        });
    }
    /**
     * 设置超时时间
     * @param path
     * @param res
     */
    static setExpires(path, res) {
        return new Promise(resolve => {
            if (!Cache.EXPIRES) {
                throw new Error('must set expires!!!');
            }
            __1.File.readFile(path).then(str => {
                const expires = new Date();
                expires.setTime(expires.getTime() + Cache.EXPIRES);
                res.setHeader('Expires', expires.toUTCString());
                resolve(str);
            });
        });
    }
    /**
     * 设置catch-control
     * @param path
     * @param res
     */
    static setCacheControl(path, res) {
        return new Promise(resolve => {
            __1.File.readFile(path).then(str => {
                res.setHeader("Cache-Control", "max-age=" + Cache.EXPIRES);
                resolve(str);
            });
        });
    }
    static getHash(str) {
        const shaSum = crypto.createHash('sha1');
        return shaSum.update(str).digest('base64');
    }
}
exports.Cache = Cache;
Cache.EXPIRES = 20 * 60 * 1000;
//# sourceMappingURL=cache.js.map