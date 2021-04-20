"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieSession = void 0;
const session_1 = require("./session");
const cookie_1 = require("./cookie");
const model_1 = require("../model/model");
class CookieSession {
    static config() {
        cookie_1.Cookie.setOption({
            maxAge: this.cookieExpire,
            domain: model_1.URL,
            path: '/',
            httpOnly: true,
        });
        session_1.Session.configExpires(this.sessionExpire);
        cookie_1.Cookie.cookieConfig('isVisit', (self) => {
            const visitTime = parseInt(self.req.cookie.isVisit);
            self.cookie.push(cookie_1.Cookie.buildCookie('isVisit', visitTime + 1));
        }, (self) => {
            self.cookie.push(cookie_1.Cookie.buildCookie('isVisit', 1));
        });
    }
}
exports.CookieSession = CookieSession;
CookieSession.cookieExpire = 1000 * 60 * 60 * 24 * 30;
CookieSession.sessionExpire = 1000 * 60 * 20;
//# sourceMappingURL=cookie-session.js.map