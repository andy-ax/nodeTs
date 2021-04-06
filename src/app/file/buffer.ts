//向一个buf中的指定位置插入buf
export const insertBuffer = function (buf0: Buffer, buf1: Buffer, start: number) {
    const len = buf0.length;
    const allBuf: Buffer = new Buffer(len + buf1.length);
    buf0.copy(allBuf,0,0,start);//copy(粘贴目标Buffer,从粘贴目标Buffer的第n位开始,从复制目标的第n位开始,到复制目标的第n位结束)复制字符 n从0开始索引
    buf1.copy(allBuf,start,0);
    buf0.copy(allBuf,start+buf1.length,start);
    return allBuf;
};
//buf数组转buf
export const array2Buffer = function (bufArr: Buffer[]) {
    let len = 0;
    const copyLen: number[] = [];
    bufArr.forEach(function (buf) {
        copyLen.push(len);
        len += buf.length;
    });
    const allBuf = new Buffer(len);
    bufArr.forEach(function (buf,i) {
        buf.copy(allBuf,copyLen[i],0);
    });
    return allBuf;
};