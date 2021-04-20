const fs = require('fs');
// import fs from 'node/fs';
const buffer = require('buffer');
import {insertBuffer, array2Buffer} from './buffer'
import {FileError} from './fileError';

export class File {

    /**
     * 使用流读取文件
     * @param filePath
     */
    static readFileStream(filePath: string): Promise<any> {
        return new Promise((res, rej)=>{
            let readStream = fs.createReadStream(filePath);
            let data = '';
            readStream
                .on('data', (chunk: any) => {
                    data+=chunk;
                })
                .on('end', function () {
                    res(data);
                })
                .on('error', (err: Error) => {
                    rej(err);
                });
        });
    }

    /**
     * 读取文件
     * @param filePath
     */
    static readFile(filePath: string) {
        return new Promise((res, rej) => {
            fs.readFile(filePath, (err: Error, file: any) => {
                if (err) {
                    rej(err)
                } else {
                    res(file);
                }
            });
        });
    }

    /**
     * 读取文件信息
     * @param filePath
     */
    static readFileMsg(filePath: string): Promise<any> {
        return new Promise((res, rej) => {
            fs.stat(filePath, function (err: Error, stat: any) {
                if (err) {
                    rej(err);
                } else {
                    res(stat);
                }
            })
        });
    }

    /**
     * 使用流写入文件
     * @param file
     * @param path
     * @param encode
     */
    static writeFile(file: any, path: string, encode?: string): Promise<void> {
        return new Promise<void>((res, rej) => {
            encode = encode || 'utf-8';
            const wS = fs.createWriteStream(path);
            wS.write(file, encode, function () {
                wS.end();
            });
            wS.on('finish', function () {
                res();
            });
            wS.on('error', function (err: Error) {
                rej(err);
            })
        });
    }

    /**
     * 拷贝文件
     * @param readPath
     * @param writePath
     */
    static copyFile(readPath: string, writePath: string): Promise<void> {
        return new Promise<void>((res, rej) => {
            fs.createReadStream(readPath)
                .on('end', function () {
                    res();
                })
                .on('error', function (err: Error) {
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
    static addTextToFile(path: string, text: string, start: number, encode?: string): Promise<void> {
        return new Promise<void>((res, rej) => {
            encode = encode || 'utf-8';
            let buffers:any [] = [];
            fs.createReadStream(path)
                .on('data', (buf: any) => {
                    buffers.push(buf);
                })
                .on('end', function () {
                    const fileBuf = new Buffer(text);
                    const fileText = insertBuffer(
                        array2Buffer(buffers),
                        fileBuf,
                        start || 0
                    );
                    File.writeFile(fileText, path, encode).then(() => {
                        res();
                    }).catch((err: Error) => {
                        rej(err)
                    })
                })
        });
    }
}