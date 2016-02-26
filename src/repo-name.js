import path from 'path';

/**
 * Returns repository name.
 *
 * @param {String} url — url of the repository.
 * @returns {String}
 */
export default function getRepoName(url) {
    return path.basename(url, '.git');
}
