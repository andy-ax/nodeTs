export interface user {
    name: String;
    password: String;
    u_info: {
        name: String;
        avatar: String;
        friend: string[];
    };
}
export declare const userType: {
    name: StringConstructor;
    password: StringConstructor;
    u_info: {
        name: StringConstructor;
        avatar: StringConstructor;
        friend: ArrayConstructor;
    };
};
export declare class User implements user {
    name: string;
    password: string;
    u_info: any;
    constructor(name: string, password: string);
}
