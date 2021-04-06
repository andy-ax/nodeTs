export const FileError = function (msg: string) {
    this.name = 'FileError';
    this.message = msg;
};

FileError.prototype = new Error();