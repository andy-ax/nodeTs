const mongodb = require('mongodb');
const mongoose = require('mongoose');
import {DBPORT, DBURL} from '../../../model/model';
export type mongodbConfig = {
    username: string;
    password: string;
    hostname: string;
    port: string;
}
export class Mongodb {
    private static dbUrl = DBURL;

    static createMongoModel(schema: any, name: string) {
        if (!Mongodb.dbUrl) {
            throw new Error('db url is not config');
        }
        return mongoose.model(name,(new mongoose.Schema(schema)));
    }

    static setUrl(config: mongodbConfig) {
        Mongodb.dbUrl = 'mongodb://' +
            config.username + ':' +
            config.password + '@' +
            config.hostname + ':' +
            config.port + '/database';
        mongoose.connect(Mongodb.dbUrl);
    };
}