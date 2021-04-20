"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
const http = require('http');
const model_1 = require("./model/model");
const utils_1 = require("./utils/utils");
const app_1 = require("./app");
class Main {
    constructor() {
        this.router = new app_1.Router();
        this.init();
    }
    init() {
        http.createServer(this.httpRequest.bind(this))
            .listen(model_1.PORT, model_1.URL, this.httpConnect.bind(this));
        // cookie & session config
        app_1.CookieSession.config();
        // route map & follow-up actions
        new app_1.Router();
        console.log('run success');
    }
    httpRequest(request, response) {
        const urlObj = utils_1.parse(request.url);
        const result = this.router.checkPath(request, urlObj.pathname);
        console.log(request);
        if (result) {
            // const cookie = Cookie.parseCookie(request.headers.cookie);
            result.action(request, response, ...result.args);
        }
        else {
            app_1.Handle404.handle404(response);
        }
    }
    httpConnect() {
        console.log('connection is success!');
    }
}
new Main();
//# sourceMappingURL=main.js.map