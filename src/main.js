"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
// import {http} from './node-base'
const http = require('http');
// import http from '@types'
const model_1 = require("./model/model");
// import { parse } from './utils/utils';
// import {
//     Router,
//     Cookie,
//     Handle404,
//     CookieSession,
// } from './app';
class Main {
    // router: Router;
    // cookie: Cookie;
    constructor() {
        // this.router = new Router();
        this.init();
    }
    init() {
        http.createServer(this.httpRequest.bind(this))
            .listen(model_1.PORT, model_1.URL, this.httpConnect.bind(this));
        // cookie & session config
        // CookieSession.config();
        //route map & follow-up actions
        // new Router();
    }
    httpRequest(request, response) {
        // const urlObj = (request as any).urlObj = parse(request.url);
        // const result = this.router.checkPath(request, urlObj.pathname);
        // if (result) {
        //     request.cookie = Cookie.parseCookie(request.headers.cookie);
        //
        //     result.action(request, response, ...result.args);
        // } else {
        //     Handle404.handle404(response);
        // }
    }
    httpConnect() {
        console.log('connection is success!');
    }
}
new Main();
//# sourceMappingURL=main.js.map