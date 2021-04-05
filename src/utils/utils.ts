const querystring = require("querystring");
const url = require("url");

/**
 * url解析
 * @param {string} path
 * @return {{pathname: string, query: {}}}
 */
export const parse = function (path: string) {
    const parses = url.parse(path);

    return {
        pathname: parses.pathname,
        query: querystring.parse(parses.query)
    };
};
