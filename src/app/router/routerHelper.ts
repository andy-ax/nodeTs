type rule = {
    execStr: string,
    regExp: RegExp,
    replaceRegExp: string,
}

export class RouterHelper {
    /**
     * 匹配好的路径正则列表
     */
    routes: any = {
        GET: [],
        POST: [],
        PUT: [],
        DELETE: []
    };

    /**
     * 规则列表
     */
    rule: rule[] = [];

    /**
     * 根据之前添加的规则，匹配所选路径符合哪个回调，如果符合则推入路径正则列表中
     * @param path
     * @param type
     * @param action 回调
     */
    private use(path: string, type: string, action: Function) {
        type = type.toUpperCase();

        this.rule.forEach((ruleObj) => {
            if (path.indexOf(ruleObj.execStr) > -1) {
                path = path.replace(ruleObj.regExp, ruleObj.replaceRegExp);
            }
        });
        const exp = new RegExp('^' + path + '$');

        this.routes[type].push({
            path: exp,
            action: action
        });
    };

    post(path: string, action: Function) {
        this.use(path, 'post', action);
    }

    delete(path: string, action: Function) {
        this.use(path, 'delete', action);
    }

    put(path: string, action: Function) {
        this.use(path, 'put', action);
    }

    get(path: string, action: Function) {
        this.use(path, 'get', action);
    }

    /**
     * 占位符规则添加
     * @param execStr 占位符 以:开始
     * @param regExp 占位符匹配
     * @param replaceRegExp 匹配到占位符之后将替换为真正的正则匹配
     */
    addRule(execStr: string, regExp: RegExp, replaceRegExp: string) {
        this.rule.push({
            execStr: execStr,
            regExp: regExp,
            replaceRegExp: replaceRegExp
        });
    }

    checkPath(req: Request, pathname: string) {
        let route,
            i,
            len,
            result,
            args,
            type = req.method;

        for (i = 0,len = this.routes[type].length; i < len; i++) {
            route = this.routes[type][i];
            result = route.path.exec(pathname);
            if (result) {
                route.path.lastIndex = 0;
                result.shift();
                //将req,res与匹配项叠加
                args = [].concat(result);

                return {
                    action: route.action,
                    args: args
                };
            }
        }
        return false;
    };
}
