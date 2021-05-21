import {Mongodb} from './mongodb/mongodb';
import {User, user, userType} from "./data";

const mongo = Mongodb;
export class DbStorage {
    static users: any;
    private static mongo: any;
    static init() {
        this.mongo = new Mongodb();
        this.mongo.connect();
        this.user();
    }
    static user() {
        this.users = mongo.createMongoModel(userType, 'users');
        this.users._init = User;
    }
}
DbStorage.init();