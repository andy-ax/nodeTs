"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const routerHelper_1 = require("./routerHelper");
const cookie_1 = require("../cookie&session/cookie");
const file_1 = require("../file/file");
const handle404_1 = require("../handle404/handle404");
class Router extends routerHelper_1.RouterHelper {
    constructor() {
        super();
        this.addRouteReg();
        this.getRouter();
    }
    addRouteReg() {
        //添加路由映射正则
        this.addRule(':username', /:username/g, '([0-9a-zA-Z_]+)');
        this.addRule(':room', /:room/g, 'room(\\\d+)');
        this.addRule(':css', /:css/g, '([0-9a-zA-Z_]+\\\.css)');
        this.addRule(':js', /:js/g, '([0-9a-zA-Z_]+\\\.js)');
        this.addRule(':img', /:img/g, '([0-9a-zA-Z_]+\\\.(?:png|jpg))');
        this.addRule(':font', /:font/g, '([0-9a-zA-Z_]+\\\.(?:eot|svg|ttf|woff))');
    }
    getRouter() {
        //加载主页
        this.get('/', function (req, res) {
            const cookie = new cookie_1.Cookie(req, res);
            cookie.checkAllCookie();
            file_1.File.readFile('./src/assets/index.html').then(file => {
                cookie.setCookie();
                res.writeHeader(200, 'OK');
                res.end(file);
            }).catch(err => {
                if (err.code === 'ENOENT') {
                    handle404_1.Handle404.handle404(res);
                }
            });
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map