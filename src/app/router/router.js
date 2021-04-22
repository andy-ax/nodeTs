"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const routerHelper_1 = require("./routerHelper");
const __1 = require("..");
const handle404 = __1.Handle404.handle404;
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
        // 加载主页
        this.get('/', function (req, res) {
            const cookie = new __1.Cookie(req, res);
            cookie.checkAllCookie();
            __1.File.readFile('./src/assets/html/index.html').then(file => {
                cookie.setCookie();
                res.writeHeader(200, 'OK');
                res.end(file);
            }).catch(err => {
                if (err.code === 'ENOENT') {
                    __1.Handle404.handle404(res);
                }
            });
        });
        // 读取图片
        this.get('/img/:img', function (req, res, img) {
            __1.Cache.checkModified('/src/assets/images/' + img, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                }
                else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    __1.Handle404.handle404(res);
                }
            });
        });
        // 读取css
        this.get('/css/:css', function (req, res, css) {
            __1.Cache.checkModified('/src/assets/css/' + css, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                }
                else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    __1.Handle404.handle404(res);
                }
            });
        });
        // 读取js
        this.get('/js/:js', function (req, res, js) {
            __1.Cache.checkModified('/src/assets/js/' + js, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                }
                else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    __1.Handle404.handle404(res);
                }
            });
        });
        // 读取font
        this.get('/font/:font', function (req, res, font) {
            __1.Cache.checkModified('/src/assets/font/' + font, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                }
                else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    handle404(res);
                }
            });
        });
        // 查询session
        this.get('/session', function (req, res) {
            const cookie = new __1.Cookie(req, res);
            const sessionKey = 's_id';
            cookie.checkCookie(sessionKey).then(() => {
                return __1.Session.checkSession(req.mount.cookie[sessionKey]);
            }).then(session => {
            }).catch(() => {
                handle404(res);
            });
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map