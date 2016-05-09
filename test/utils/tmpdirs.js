const fs = require('fs-extra');
const promisify = require('es6-promisify');
const tempfile = require('tempfile');

const remove = promisify(fs.remove);

/**
 * Util for works with tmp dirs.
 *
 * It is necessary to clone repositories independently.
 *
 * @returns {{ tmpdir: Function, clear: Funciton }}
 */
module.exports = function tmpdirs() {
    const dirs = [];

    return {
        /**
         * Generate dirname.
         * @returns {String}
         */
        tmpdir: () => {
            const dir = tempfile();

            dirs.push(dir);

            return dir;
        },
        /**
         * Removed all tmp dirs.
         * @returns {Promise}
         */
        clear: () => {
            return Promise.all(dirs.map(dir => remove(dir)));
        }
    };
};
