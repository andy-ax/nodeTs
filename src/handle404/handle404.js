"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle404 = void 0;
class Handle404 {
    static handle404(res, msg) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Error 404: resource not found.');
        res.end(msg || '');
    }
}
exports.Handle404 = Handle404;
//# sourceMappingURL=handle404.js.map