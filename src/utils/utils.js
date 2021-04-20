"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = exports.parse = void 0;
const querystring = require("querystring");
const url = require("url");
/**
 * url解析
 * @param {string} path
 * @return {{pathname: string, query: {}}}
 */
const parse = (path) => {
    const parses = url.parse(path);
    return {
        pathname: parses.pathname,
        query: querystring.parse(parses.query)
    };
};
exports.parse = parse;
const extend = (source, destination) => {
    for (let property in source) {
        if (!destination[property])
            destination[property] = source[property];
    }
    return destination;
};
exports.extend = extend;
//# sourceMappingURL=utils.js.map