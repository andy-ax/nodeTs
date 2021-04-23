import {RouterHelper} from './routerHelper';
import {Cookie, File, Cache, Session, DbStorage, user} from '..';
import {Handle404} from "../handle404/handle404";
const handle404 = Handle404.handle404;
export class Router extends RouterHelper{
    constructor() {
        super();
        this.addRouteReg();
        this.getRouter();
        this.postRouter();
    }

    addRouteReg() {
        //添加路由映射正则
        this.addRule(':username',/:username/g,'([0-9a-zA-Z_]+)');
        this.addRule(':room',/:room/g,'room(\\\d+)');
        this.addRule(':css',/:css/g,'([0-9a-zA-Z_]+\\\.css)');
        this.addRule(':js',/:js/g,'([0-9a-zA-Z_]+\\\.js)');
        this.addRule(':img',/:img/g,'([0-9a-zA-Z_]+\\\.(?:png|jpg))');
        this.addRule(':font',/:font/g,'([0-9a-zA-Z_]+\\\.(?:eot|svg|ttf|woff))');
    }

    getRouter() {
        // 加载主页
        this.get('/', function (req: Request, res: Response) {
            const cookie = new Cookie(req, res);
            cookie.checkAllCookie();
            File.readFile('./src/assets/html/index.html').then(file => {
                cookie.setCookie();
                res.writeHeader(200, 'OK');
                res.end(file);
            }).catch(err => {
                if (err.code === 'ENOENT') {
                    Handle404.handle404(res);
                }
            })
        });
        // 加载登录页
        this.get('/login', function (req: Request, res: Response) {
            const cookie = new Cookie(req, res);
            cookie.checkAllCookie();
            File.readFile('./src/assets/html/login.html').then(file => {
                cookie.setCookie();
                res.writeHeader(200, 'OK');
                res.end(file);
            }).catch(err => {
                if (err.code === 'ENOENT') {
                    Handle404.handle404(res);
                }
            })
        });
        // 读取图片
        this.get('/img/:img', function (req: Request, res: Response, img: string) {
            Cache.checkModified('./src/assets/images/' + img, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                } else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    Handle404.handle404(res);
                }
            })
        });

        // 读取css
        this.get('/css/:css', function (req: Request, res: Response, css: string) {
            Cache.checkModified('./src/assets/css/' + css, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                } else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    Handle404.handle404(res);
                }
            })
        });

        // 读取js
        this.get('/js/:js', function (req: Request, res: Response, js: string) {
            Cache.checkModified('./src/assets/js/' + js, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                } else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    Handle404.handle404(res);
                }
            })
        });

        // 读取font
        this.get('/font/:font', function (req: Request, res: Response, font: string) {
            Cache.checkModified('./src/assets/font/' + font, req, res).then((file) => {
                if (file) {
                    res.writeHeader(200, 'OK');
                    res.end(file);
                } else {
                    res.writeHeader(304, 'Not Modified');
                    res.end();
                }
            }).catch((err) => {
                if (err.code === 'ENOENT') {
                    handle404(res);
                }
            })
        });

        // 查询session
        this.get('/session', function (req: Request, res: Response) {
            const cookie = new Cookie(req, res);
            const sessionKey = 's_id';
            cookie.checkCookie(sessionKey).then(() => {
                return Session.checkSession(req.mount.cookie[sessionKey]);
            }).then((session: any) => {
                const regExpExecArray = DbStorage.users.find({name: session.user})
                    .exec((err: Error, datas: user[]) => {
                    if (!err && datas.length === 1 && datas[0].name === session.user) {
                        cookie.cookie.push(Cookie.buildCookie('s_id',
                            session.s_id,
                            {maxAge: session.cookie.expire}
                        ));
                        cookie.setCookie();

                        res.setHeader('content-type', 'application/json');
                        res.writeHeader(200, 'OK');
                        // 返回u_info json
                        let u_info = datas[0].u_info;
                        res.end(JSON.stringify(u_info));
                        return;
                    }
                    handle404(res);
                });
            }).catch(() => {
                handle404(res);
            })
        });
    }

    postRouter() {
        this.post('/login', function (req: Request, res: Response) {
            let str = '';
            req.on('data', (chunk: string) => {
                str += chunk;
            });
            req.on('end', () => {
                const data = queryString.parse(str);
                debugger
            });
        });
        this.post('/register', function (req: Request, res: Response) {
            let str = '';
            req.on('data', (chunk: string) => {
                str += chunk;
            });
            req.on('end', () => {
                const data = queryString.parse(str);
                debugger
            });
        });
    }
}
