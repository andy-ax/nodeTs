export declare class File {
    /**
     * 使用流读取文件
     * @param filePath
     */
    static readFileStream(filePath: string): Promise<any>;
    /**
     * 读取文件
     * @param filePath
     */
    static readFile(filePath: string): Promise<unknown>;
    /**
     * 读取文件信息
     * @param filePath
     */
    static readFileMsg(filePath: string): Promise<any>;
    /**
     * 使用流写入文件
     * @param file
     * @param path
     * @param encode
     */
    static writeFile(file: any, path: string, encode?: string): Promise<void>;
    /**
     * 拷贝文件
     * @param readPath
     * @param writePath
     */
    static copyFile(readPath: string, writePath: string): Promise<void>;
    /**
     * 向文件指定位置添加文本
     * @param path
     * @param text
     * @param start
     * @param encode
     */
    static addTextToFile(path: string, text: string, start: number, encode?: string): Promise<void>;
    static getRequestData(req: Request): Promise<unknown>;
}
