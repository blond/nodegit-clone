const del = require('del');
const tempfile = require('tempfile');

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
            return Promise.all(dirs.map(dir => del(dir, { force: true })));
        }
    };
};
