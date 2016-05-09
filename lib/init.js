const path = require('path');
const thr = require('throw');

const repoName = require('./repo-name');

/**
 * Initializes options.
 *
 * @param {Object} options - options
 * @returns {String}
 */
module.exports = function init(options) {
    const opts = options || {};
    const url = typeof opts === 'string'
        ? opts
        : opts.url || thr('You should specify url to repository.');
    const localPath = opts.localPath || repoName(url);

    return {
        url: url,
        localPath: path.resolve(localPath),
        ghToken: opts.ghToken,
        ssh: opts.ssh || {}
    };
};
