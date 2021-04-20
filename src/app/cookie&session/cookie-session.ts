import {Session} from "./session";
import {Cookie} from "./cookie";
import {URL} from '../../model/model'

export class CookieSession {
    static cookieExpire = 1000 * 60 * 60 * 24 * 30;
    static sessionExpire = 1000 * 60 * 20;

    static config() {
        Cookie.setOption({
            maxAge: this.cookieExpire,
            domain: URL,
            path: '/',
            httpOnly: true,
        });
        Session.configExpires(this.sessionExpire);
        Cookie.cookieConfig('isVisit', (self: any) => {
            const visitTime = parseInt(self.req.cookie.isVisit);
            self.cookie.push(
                Cookie.buildCookie('isVisit', visitTime+1)
            );
        }, (self: Cookie) => {
            self.cookie.push(
                Cookie.buildCookie('isVisit', 1)
            );
        })
    }
}
