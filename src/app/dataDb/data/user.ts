export interface user {
    name: String;
    password: String;
    u_info: {
        name: String;
        avatar: String;
        friend: string[];
    };
}
export const userType = {
    name: String,
    password: String,
    u_info: {
        name: String,
        avatar: String,
        friend: Array,
    }
};

export class User implements user{
    name: string;
    password: string;
    u_info: any;
    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.u_info = {
            name: name,
            avatar: './img/default.jpg',
            friend: [],
        }
    }
}