/**
 *
 */
const http = require('http');
import {PORT, URL} from './model/model';
import {parse} from './utils/utils';
import {Cookie, CookieSession, Handle404, Router,} from './app';

class Main {
    router: Router;
    constructor() {
        this.router = new Router();
        this.init();
    }

    init() {
        http.createServer(this.httpRequest.bind(this))
            .listen(PORT, URL, this.httpConnect.bind(this));

        // cookie & session config
        CookieSession.config();

        // route map & follow-up actions
        new Router();
        console.log('run success');
    }

    httpRequest(request:Request, response:Response) {
        const urlObj = parse(request.url);
        const result = this.router.checkPath(request, urlObj.pathname);
        request.mount = {};
        if (result) {
            request.mount.cookie = Cookie.parseCookie(request.headers.cookie);
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
