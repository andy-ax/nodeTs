/**
 *
 */
const http = require("http");
import { PORT, URL } from  './model/model';
import { parse } from './utils/utils';
import {
    Router,
    Cookie,
    Handle404,
} from './app/index';

class Main {
    router: Router;
    cookie: Cookie;
    constructor() {
        this.router = new Router();
        this.init();
    }

    init() {
        http.createServer(this.httpRequest.bind(this))
            .listen(PORT, URL, this.httpConnect.bind(this));

        // cookie & session config
        var CSConfig = require('./cookie&session_config');
        CSConfig.config();

        // cache config
        var cacheStorage = require('./cache&storage');
        cacheStorage.cacheConfig();

        //route map & follow-up actions
        var routeMap = require('./routeMap').routeMap;
        routeMap();
    }

    httpRequest(request:Request, response:Response) {
        const urlObj = (request as any).urlObj = parse(request.url);
        const result = this.router.checkPath(request, urlObj.pathname);
        if (result) {
            request.cookie = Cookie.parseCookie(request.headers.cookie);

            result.action(request, response, ...result.args);
        } else {
            Handle404.handle404(response);
        }
    }

    httpConnect() {
        console.log('connection is success!')
    }
}

new Main();
