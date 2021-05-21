const mongodb = require('mongodb');
const mongoose = require('mongoose');
import {DBPORT, DBURL} from '../../../model/model';
export type mongodbConfig = {
    url: string;
    port: string;
}
export class Mongodb {
    private static dbUrl = DBURL;
    private db: any;

    private status = 'unConnect';

    connect() {
        this.db = mongoose.connect(Mongodb.dbUrl);
        debugger
        // this.db.connection.on("error", (error: Error) => {
        //     console.log("数据库连接失败：" + error);
        //     this.status = 'error';
        // });
        //
        // this.db.connection.on("open", () => {
        //     console.log("数据库连接成功");
        //     this.status = 'connect';
        // });
        //
        // this.db.connection.on('disconnected', () => {
        //     console.log('数据库连接断开');
        //     this.status = 'unConnect';
        // });
    }

    static createMongoModel(schema: any, name: string) {
        if (!Mongodb.dbUrl) {
            throw new Error('db url is not config');
        }
        return mongoose.model(name,(new mongoose.Schema(schema)));
    }

    static setUrl(config: mongodbConfig) {
        Mongodb.dbUrl = 'mongodb://' +
            config.url + ':' +
            config.port + '/mongodb';
    };
}