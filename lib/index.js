"use strict";

import path from "path";
import readDir from "read-dir-and-stat";
import camelo from "camelo";

/**
 * fsFileTree
 * Get a directory file tree as an object.
 * @name fsFileTree
 * @function
 * @param {string} inputPath The input path.
 * @param {object} opts An object containing the following fields:
 *
 *  - `camelCase` (Boolean): Convert the file names in camelcase format (to be easily accessible using dot notation).
 *  - `all` (Boolean): If `true`, it will include the hidden files/directories.
 * @returns {Promise} A promise that resolves to the file tree object.
 */
export default async function fsFileTree (inputPath, opts = {}) {
    let result = {};
    inputPath = inputPath || process.cwd();

    const items = await readDir(inputPath);

    await Promise.all(items.map(c => {
        let basename = path.basename(c.path);

        if (basename.charAt(0) === "." && !opts.all) {
            return;
        }

        if (opts.camelCase) {
            basename = camelo(basename);
        }

        if (c.stat.isDirectory()) {
            return fsFileTree(c.path, opts).then(res => {
                result[basename] = res;
            });
        }

        result[basename] = c;
    }));

    return result;
}