import fs from 'fs-extra';
import promisify from 'es6-promisify';
import tempfile from 'tempfile';

const remove = promisify(fs.remove);

/**
 * Util for works with tmp dirs.
 *
 * It is necessary to clone repositories independently.
 *
 * @returns {{ tmpdir: Function, clear: Funciton }}
 */
export default function tmpdirs() {
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
         */
        clear: () => {
            return Promise.all(dirs.map(dir => remove(dir)));
        }
    };
}
