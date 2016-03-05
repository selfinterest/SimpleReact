/**
 * Created by terrence_watson on 3/5/16.
 */
"use strict";

let path = require("path");

/**
 * Returns a function that returns a path starting from a prefix. Used to quickly stamp out the path functions this module exports
 * @param {String} prefix
 * @returns {Function}
 */
function pathCreator(prefix){
    //Append the path to the absolute path of the application.)
    return p => path.join(__dirname, "..", prefix, p || '')
}

/*
 The functions below are used to generate absolute paths for use in various parts of the configuration of the app
 */

/**
 * A function that, given a path, appends that path to the absolute /src path of the application
 * That is: srcPath("client") returns /${appBase}/src/client
 * @type {Function}
 */
exports.srcPath = pathCreator("src");

/**
 * A function that, given a path, appends that path to the absolute /dist path of the application
 * @type {Function}
 */
exports.distPath = pathCreator("dist");

/**
 * A function that, given a path, appends that path to the absolute /build-cfg path of the application
 * @type {Function}
 */
exports.buildCfgPath = pathCreator("build-cfg");


exports.testPath = pathCreator("test");


