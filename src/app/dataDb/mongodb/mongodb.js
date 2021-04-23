"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongodb = void 0;
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const model_1 = require("../../../model/model");
class Mongodb {
    static createMongoModel(schema, name) {
        if (!Mongodb.dbUrl) {
            throw new Error('db url is not config');
        }
        return mongoose.model(name, (new mongoose.Schema(schema)));
    }
    static setUrl(config) {
        Mongodb.dbUrl = 'mongodb://' +
            config.username + ':' +
            config.password + '@' +
            config.hostname + ':' +
            config.port + '/database';
        mongoose.connect(Mongodb.dbUrl);
    }
    ;
}
exports.Mongodb = Mongodb;
Mongodb.dbUrl = model_1.DBURL;
//# sourceMappingURL=mongodb.js.map