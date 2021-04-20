"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const utils_1 = require("../utils/utils");
const queryString = require('querystring');
class Cookie {
    constructor(req, res) {
        this.cookie = [];
        this.req = req;
        this.res = res;
    }
    /**
     * 设置cookie头
     */
    setCookie() {
        if (this.cookie.length === 1) {
            this.res.setHeader('Set-Cookie', this.cookie[0]);
        }
        else {
            this.res.setHeader('Set-Cookie', this.cookie);
        }
    }
    /**
     * 检查设定的cookie是否存在
     * @param key
     * @param success
     * @param fail
     */
    checkCookie(key, success, fail) {
        if (this.req.cookie[key] !== undefined) {
            success(this);
        }
        else {
            fail(this);
        }
    }
    /**
     * 检查全部 cookie
     */
    checkAllCookie() {
        let success, fail;
        for (let i in Cookie.cookies) {
            success = Cookie.cookies[i].success;
            fail = Cookie.cookies[i].fail;
            this.checkCookie(i, success, fail);
        }
    }
    /**
     * option设置
     * @param {object} opt
     */
    static setOption(opt) {
        Cookie.option = opt;
    }
    /**
     * 存储已配置的cookie
     * @param {string} key
     * @param {function} success
     * @param {function} fail
     */
    static cookieConfig(key, success, fail) {
        Cookie.cookies[key] = {
            success,
            fail
        };
    }
    ;
    /**
     * 将cookie切成对象
     * @param {string} cookie
     * @return {object}
     */
    static parseCookie(cookie) {
        cookie = cookie.replace(/\s+/g, '');
        return queryString.parse(cookie, ';', '=');
    }
    ;
    /**
     * 创建cookie
     * @param {string} name
     * @param  val
     * @param {object} [opt]
     * @return {string}
     */
    static buildCookie(name, val, opt) {
        let pairs = [name + '=' + queryString.escape(val)];
        opt ? utils_1.extend(Cookie.option, opt) : opt = Cookie.option;
        try {
            if (opt.maxAge)
                pairs.push('Max-Age=' + opt.maxAge);
            if (opt.domain)
                pairs.push('Domain=' + opt.domain);
            if (opt.path)
                pairs.push('Path=' + opt.path);
            if (opt.expires)
                pairs.push('Expires=' + opt.expires.toUTCString());
            if (opt.httpOnly)
                pairs.push('HttpOnly');
            if (opt.secure)
                pairs.push('Secure');
            return pairs.join('; ');
        }
        catch (e) {
            throw new Error('must set option!!!');
        }
    }
    ;
}
exports.Cookie = Cookie;
Cookie.cookies = {};
//# sourceMappingURL=cookie.js.map