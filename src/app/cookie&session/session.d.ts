declare type session = {
    s_id: string;
    user: any;
    cookie: {
        expire: number;
    };
};
declare type sessions = {
    [key: string]: session;
};
export declare class Session {
    /**
     * 存储session，后续将使用服务器存储
     */
    static sessions: sessions;
    static EXPIRES: number;
    /**
     * 设定超时时间
     * @param {number} expires
     */
    static configExpires(expires: number): void;
    /**
     * 生成session
     * @param user
     * @return {{s_id: *, cookie: {expire: *}}}
     */
    static generateSession(user: any): session;
    /**
     * 检查session是否存在，并判断是否超时，如未超时则更新超时时间并成功返回
     * @param {string} s_id
     */
    static checkSession(s_id: string): Promise<unknown>;
    private static generateSId;
    private static setExpiresTime;
}
export {};
