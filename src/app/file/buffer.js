"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array2Buffer = exports.insertBuffer = void 0;
//向一个buf中的指定位置插入buf
const insertBuffer = function (buf0, buf1, start) {
    const len = buf0.length;
    const allBuf = new Buffer(len + buf1.length);
    buf0.copy(allBuf, 0, 0, start); //copy(粘贴目标Buffer,从粘贴目标Buffer的第n位开始,从复制目标的第n位开始,到复制目标的第n位结束)复制字符 n从0开始索引
    buf1.copy(allBuf, start, 0);
    buf0.copy(allBuf, start + buf1.length, start);
    return allBuf;
};
exports.insertBuffer = insertBuffer;
//buf数组转buf
const array2Buffer = function (bufArr) {
    let len = 0;
    const copyLen = [];
    bufArr.forEach(function (buf) {
        copyLen.push(len);
        len += buf.length;
    });
    const allBuf = new Buffer(len);
    bufArr.forEach(function (buf, i) {
        buf.copy(allBuf, copyLen[i], 0);
    });
    return allBuf;
};
exports.array2Buffer = array2Buffer;
//# sourceMappingURL=buffer.js.map