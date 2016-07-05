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
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
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
