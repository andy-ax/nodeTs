"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const fs = require('fs');
// import fs from 'node/fs';
const buffer = require('buffer');
const queryString = require('queryString');
const buffer_1 = require("./buffer");
require("./fileError");
class File {
    /**
     * 使用流读取文件
     * @param filePath
     */
    static readFileStream(filePath) {
        return new Promise((res, rej) => {
            let readStream = fs.createReadStream(filePath);
            let data = '';
            readStream
                .on('data', (chunk) => {
                data += chunk;
            })
                .on('end', function () {
                res(data);
            })
                .on('error', (err) => {
                rej(err);
            });
        });
    }
    /**
     * 读取文件
     * @param filePath
     */
    static readFile(filePath) {
        return new Promise((res, rej) => {
            fs.readFile(filePath, (err, file) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(file);
                }
            });
        });
    }
    /**
     * 读取文件信息
     * @param filePath
     */
    static readFileMsg(filePath) {
        return new Promise((res, rej) => {
            fs.stat(filePath, function (err, stat) {
                if (err) {
                    rej(err);
                }
                else {
                    res(stat);
                }
            });
        });
    }
    /**
     * 使用流写入文件
     * @param file
     * @param path
     * @param encode
     */
    static writeFile(file, path, encode) {
        return new Promise((res, rej) => {
            encode = encode || 'utf-8';
            const wS = fs.createWriteStream(path);
            wS.write(file, encode, function () {
                wS.end();
            });
            wS.on('finish', function () {
                res();
            });
            wS.on('error', function (err) {
                rej(err);
            });
        });
    }
    /**
     * 拷贝文件
     * @param readPath
     * @param writePath
     */
    static copyFile(readPath, writePath) {
        return new Promise((res, rej) => {
            fs.createReadStream(readPath)
                .on('end', function () {
                res();
            })
                .on('error', function (err) {
                rej(err);
            })
                .pipe(fs.createWriteStream(writePath));
        });
    }
    /**
     * 向文件指定位置添加文本
     * @param path
     * @param text
     * @param start
     * @param encode
     */
    static addTextToFile(path, text, start, encode) {
        return new Promise((res, rej) => {
            encode = encode || 'utf-8';
            let buffers = [];
            fs.createReadStream(path)
                .on('data', (buf) => {
                buffers.push(buf);
            })
                .on('end', function () {
                const fileBuf = new Buffer(text);
                const fileText = buffer_1.insertBuffer(buffer_1.array2Buffer(buffers), fileBuf, start || 0);
                File.writeFile(fileText, path, encode).then(() => {
                    res();
                }).catch((err) => {
                    rej(err);
                });
            });
        });
    }
    static getRequestData(req) {
        return new Promise((res, rej) => {
            let str = '';
            req.on('data', (chunk) => {
                str += chunk;
            });
            req.on('end', () => {
                const data = queryString.parse(str);
                res(data);
            });
            req.on('error', (err) => {
                rej(err);
            });
        });
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map