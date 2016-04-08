import path from 'path';
import thr  from 'throw';

import repoName from './repo-name';

/**
 * Initializes options.
 *
 * @param {Object} opts - options
 * @returns {String}
 */
export default function init(opts={}) {
    const {
        url = (typeof opts === 'string') ? opts : thr('You should specify url to repository.'),
        localPath = repoName(url),
        ghToken, ssh={}
    } = opts;

    return { url, localPath: path.resolve(localPath), ghToken, ssh };
}
