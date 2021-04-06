import {RouterHelper} from './routerHelper';
import {Cookie} from "../cookie/cookie";

export class Router extends RouterHelper{
    constructor() {
        super();
        this.addRouteReg();
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
        //加载主页
        this.get('/', function (req: Request, res: Response) {
            const cookie = new Cookie(req, res);
            cookie.checkAllCookie();
            fileMod.readFile('./public/index.html', function (file) {
                cookie.setCookie();
                res.writeHeader(200, 'OK');
                res.end(file);
            },function (err) {
                if (err.code === 'ENOENT') {
                    handle404(res);
                }
            })
        });
    }
}
