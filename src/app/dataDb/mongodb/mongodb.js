"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongodb = void 0;
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const model_1 = require("../../../model/model");
class Mongodb {
    constructor() {
        this.status = 'unConnect';
    }
    connect() {
        this.db = mongoose.connect(Mongodb.dbUrl);
        debugger;
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
    static createMongoModel(schema, name) {
        if (!Mongodb.dbUrl) {
            throw new Error('db url is not config');
        }
        return mongoose.model(name, (new mongoose.Schema(schema)));
    }
    static setUrl(config) {
        Mongodb.dbUrl = 'mongodb://' +
            config.url + ':' +
            config.port + '/mongodb';
    }
    ;
}
exports.Mongodb = Mongodb;
Mongodb.dbUrl = model_1.DBURL;
//# sourceMappingURL=mongodb.js.map