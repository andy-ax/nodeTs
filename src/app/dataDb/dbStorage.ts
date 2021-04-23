import {Mongodb} from './mongodb/mongodb';
import {User, user, userType} from "./data";

const mongo = Mongodb;
export class DbStorage {
    static users: any;
    static init() {
        this.user();
    }
    static user() {
        this.users = mongo.createMongoModel(userType, 'users');
        this.users._init = User;
    }
}