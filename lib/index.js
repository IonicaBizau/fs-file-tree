"use strict";

const readDir = require("read-dir-and-stat")
    , path = require("path")
    , sameTime = require("same-time")
    , bindy = require("bindy")
    , camelo = require("camelo")
    ;

/**
 * fsFileTree
 * Get a directory file tree as an object.
 *
 * @name fsFileTree
 * @function
 * @param {String} inputPath The input path.
 * @param {Object} opts An object containing the following fields:
 *
 *  - `camelCase` (Boolean): Convert the file names in camelcase format (to be easily accessible using dot notation).
 *  - `all` (Boolean): If `true`, it will include the hidden files/directories.
 *
 * @param {Function} cb The callback function.
 */
function fsFileTree (inputPath, opts, cb) {
    let result = {};
    if (typeof inputPath === "function") {
        cb = inputPath;
        inputPath = process.cwd();
        opts = {};
    } else if (typeof opts === "function") {
        cb = opts;
        if (typeof inputPath === "object") {
            opts = inputPath;
            inputPath = process.cwd();
        } else {
            opts = {};
        }
    }

    readDir(inputPath, (err, items) => {
        if (err) { return cb(err); }
        sameTime(bindy(items, (c, done) => {
            let basename = path.basename(c.path);

            if (basename.charAt(0) === "." && !opts.all) {
                return done();
            }

            if (opts.camelCase) {
                basename = camelo(basename);
            }

            if (c.stat.isDirectory()) {
                return fsFileTree(c.path, opts, (err, res) => {
                    if (err) { return done(err); }
                    result[basename] = res;
                    done();
                });
            }

            result[basename] = c;
            done();
        }), err => cb(err, result));
    });
}

/**
 * sync
 * The sync version.
 *
 * @name sync
 * @function
 * @param {String} inputPath The input path.
 * @param {Object} opts An object containing the following fields:
 *
 *  - `camelCase` (Boolean): Convert the file names in camelcase format (to be easily accessible using dot notation).
 *  - `all` (Boolean): If `true`, it will include the hidden files/directories.
 *
 * @returns {Object} The directory tree.
 */
fsFileTree.sync = function (inputPath, opts) {
    let result = {};
    opts = opts || {};

    readDir.sync(inputPath).forEach(c => {
        let basename = path.basename(c.path);

        if (basename.charAt(0) === "." && !opts.all) {
            return;
        }

        if (opts.camelCase) {
            basename = camelo(basename);
        }

        if (c.stat.isDirectory()) {
            return (result[basename] = fsFileTree.sync(c.path, opts));
        }

        result[basename] = c;
    });

    return result;
};

module.exports = fsFileTree;
