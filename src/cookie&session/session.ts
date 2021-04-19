type session = {
    s_id: string,
    user: any,
    cookie: {
        expire: number
    }
}

type sessions = {
    [key: string]: session;
}

export class Session {
    /**
     * 存储session，后续将使用服务器存储
     */
    static sessions: sessions = {};
    static EXPIRES = 20 * 60 * 1000;

    /**
     * 设定超时时间
     * @param {number} expires
     */
    static configExpires(expires: number) {
        Session.EXPIRES = expires;
    }

    /**
     * 生成session
     * @param user
     * @return {{s_id: *, cookie: {expire: *}}}
     */
    static generateSession(user: any): session {
        const newSession: session = {
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
     * @param {function} [success]
     * @param {function} [fail]
     */
    static checkSession(s_id: string, success: Function, fail: Function) {
        const session = Session.sessions[s_id];
        if (session) {
            const date = (new Date).valueOf();
            if (session.cookie.expire > date) {
                session.cookie.expire = date + Session.EXPIRES;
                success(session);
            } else {
                delete Session.sessions[s_id];
                fail();
            }
        } else {
            fail();
        }
    }

    private static generateSId() {
        return (new Date()).valueOf() + '' + Math.random();
    }

    private static setExpiresTime(): number {
        return (new Date()).valueOf() + Session.EXPIRES;
    }
}