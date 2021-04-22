"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
class Session {
    /**
     * 设定超时时间
     * @param {number} expires
     */
    static configExpires(expires) {
        Session.EXPIRES = expires;
    }
    /**
     * 生成session
     * @param user
     * @return {{s_id: *, cookie: {expire: *}}}
     */
    static generateSession(user) {
        const newSession = {
            //生成唯一id
            s_id: Session.generateSId(),
            user: user,
            cookie: {
                //设置cookie超时时间
                expire: Session.setExpiresTime()
            }
        };
        Session.sessions[newSession.s_id] = newSession;
        return newSession;
    }
    /**
     * 检查session是否存在，并判断是否超时，如未超时则更新超时时间并成功返回
     * @param {string} s_id
     */
    static checkSession(s_id) {
        return new Promise((resolve, reject) => {
            const session = Session.sessions[s_id];
            if (session) {
                const date = (new Date).valueOf();
                if (session.cookie.expire > date) {
                    session.cookie.expire = date + Session.EXPIRES;
                    resolve(session);
                }
                else {
                    delete Session.sessions[s_id];
                    reject();
                }
            }
            else {
                reject();
            }
        });
    }
    static generateSId() {
        return (new Date()).valueOf() + '' + Math.random();
    }
    static setExpiresTime() {
        return (new Date()).valueOf() + Session.EXPIRES;
    }
}
exports.Session = Session;
/**
 * 存储session，后续将使用服务器存储
 */
Session.sessions = {};
Session.EXPIRES = 20 * 60 * 1000;
//# sourceMappingURL=session.js.map