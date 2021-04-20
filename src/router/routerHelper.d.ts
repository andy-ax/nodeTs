declare type rule = {
    execStr: string;
    regExp: RegExp;
    replaceRegExp: string;
};
export declare class RouterHelper {
    /**
     * 匹配好的路径正则列表
     */
    routes: any;
    /**
     * 规则列表
     */
    rule: rule[];
    /**
     * 根据之前添加的规则，匹配所选路径符合哪个回调，如果符合则推入路径正则列表中
     * @param path
     * @param type
     * @param action 回调
     */
    private use;
    post(path: string, action: Function): void;
    delete(path: string, action: Function): void;
    put(path: string, action: Function): void;
    get(path: string, action: Function): void;
    /**
     * 占位符规则添加
     * @param execStr 占位符 以:开始
     * @param regExp 占位符匹配
     * @param replaceRegExp 匹配到占位符之后将替换为真正的正则匹配
     */
    addRule(execStr: string, regExp: RegExp, replaceRegExp: string): void;
    checkPath(req: Request, pathname: string): false | {
        action: any;
        args: never[];
    };
}
export {};
