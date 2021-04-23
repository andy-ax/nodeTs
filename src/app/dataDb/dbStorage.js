"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbStorage = void 0;
const mongodb_1 = require("./mongodb/mongodb");
const data_1 = require("./data");
const mongo = mongodb_1.Mongodb;
class DbStorage {
    static init() {
        this.user();
    }
    static user() {
        this.users = mongo.createMongoModel(data_1.userType, 'users');
        this.users._init = data_1.User;
    }
}
exports.DbStorage = DbStorage;
//# sourceMappingURL=dbStorage.js.map