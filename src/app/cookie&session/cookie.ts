import { extend } from '../../utils/utils';
const queryString = require('querystring');

type Option = {
    maxAge: number;
    domain: string;
    path: string;
    expires?: {
        toUTCString: () => string;
    };
    httpOnly: any;
    secure?: any;
};

type anyObject = {
    [key: string]: any;
}

export class Cookie {
    static option: Option;
    static cookies: any = {};

    req: any;
    res: any;
    cookie: any[] = [];

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    /**
     * 设置cookie头
     */
    setCookie() {
        if (this.cookie.length === 1) {
            this.res.setHeader('Set-Cookie', this.cookie[0]);
        } else {
            this.res.setHeader('Set-Cookie', this.cookie);
        }
    }

    /**
     * 检查设定的cookie是否存在
     * @param key
     */
    checkCookie(key: string) {
        return new Promise((resolve, reject) => {
            if (this.req.mount.cookie[key] !== undefined) {
                resolve(this);
            } else {
                reject(this);
            }
        });
    }

    /**
     * 检查全部 cookie
     */
    checkAllCookie() {
        let success: Function;
        let fail: Function;
        for (let i in Cookie.cookies) {
            success = Cookie.cookies[i].success;
            fail = Cookie.cookies[i].fail;
            this.checkCookie(i).then(self => {
                success(self);
            }).catch(self => {
                fail(self);
            });
        }
    }

    /**
     * option设置
     * @param {object} opt
     */
    static setOption(opt: Option) {
        Cookie.option = opt;
    }

    /**
     * 存储已配置的cookie
     * @param {string} key
     * @param {function} success
     * @param {function} fail
     */
    static cookieConfig(key: string, success: Function, fail: Function) {
        Cookie.cookies[key] = {
            success,
            fail
        };
    };

    /**
     * 将cookie切成对象
     * @param {string} cookie
     * @return {object}
     */
    static parseCookie(cookie: any): anyObject {
        cookie = cookie.replace(/\s+/g, '');
        return queryString.parse(cookie, ';', '=');
    };

    /**
     * 创建cookie
     * @param {string} name
     * @param  val
     * @param {object} [opt]
     * @return {string}
     */
    static buildCookie(name: string, val: any, opt?: Option) {
        let pairs = [name + '=' + queryString.escape(val)];
        opt ? extend(Cookie.option, opt) : opt = Cookie.option;
        try {
            if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
            if (opt.domain) pairs.push('Domain=' + opt.domain);
            if (opt.path) pairs.push('Path=' + opt.path);
            if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
            if (opt.httpOnly) pairs.push('HttpOnly');
            if (opt.secure) pairs.push('Secure');
            return pairs.join('; ');
        } catch (e) {
            throw new Error('must set option!!!');
        }
    };
}
