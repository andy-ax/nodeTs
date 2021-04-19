export class FileError extends Error{
    name = 'FileError';
    message: string;
    constructor(msg: string) {
        super();
        this.message = msg;
    }
}