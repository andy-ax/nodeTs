"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileError = void 0;
class FileError extends Error {
    constructor(msg) {
        super();
        this.name = 'FileError';
        this.message = msg;
    }
}
exports.FileError = FileError;
//# sourceMappingURL=fileError.js.map