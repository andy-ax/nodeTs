const querystring = require("querystring");
const url = require("url");

/**
 * url解析
 * @param {string} path
 * @return {{pathname: string, query: {}}}
 */
export const parse = (path: string) => {
    const parses = url.parse(path);

    return {
        pathname: parses.pathname,
        query: querystring.parse(parses.query)
    };
};
export const extend = (source: any, destination: any) => {
    for (let property in source) {
        if (!destination[property]) destination[property] = source[property];
    }
    return destination;
};