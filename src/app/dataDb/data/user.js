"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userType = void 0;
exports.userType = {
    name: String,
    password: String,
    u_info: {
        name: String,
        avatar: String,
        friend: Array,
    }
};
class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.u_info = {
            name: name,
            avatar: './img/default.jpg',
            friend: [],
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map