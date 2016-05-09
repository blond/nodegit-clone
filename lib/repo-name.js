const path = require('path');

/**
 * Returns repository name.
 *
 * @param {String} url — url of the repository.
 * @returns {String}
 */
module.exports = function getRepoName(url) {
    return path.basename(url, '.git');
};
