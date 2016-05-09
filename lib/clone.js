const os = require('os');

const git = require('nodegit');
const isSSH = require('is-ssh');

const init = require('./init');

/**
 * Clones repository to `localPath`.
 *
 * @param {Object} opts                  Options or url of the repository.
 * @param {String} opts.url              The URL to the repository.
 * @param {String} [opts.localPath]      The Local path to store repository.
 * @param {String} [opts.ghToken]        The GitHub personal OAuth token.
 * @param {Object} [opts.ssh]            The object with paths to ssh keys and passphrase.
 * @param {String} [opts.ssh.publicKey]  The path to the public key of the credential.
 * @param {String} [opts.ssh.privateKey] The path to the private key of the credential.
 * @param {String} [opts.ssh.passphrase] The passphrase of the credential.
 *
 * @returns {Promise<Git.Repository>} A promise `Git.Repository` instance.
 * @see [Git.Repository]{@link http://www.nodegit.org/api/repository/}
 */
module.exports = function clone(opts) {
    const initedOptions = init(opts);
    const url = initedOptions.url;
    const localPath = initedOptions.localPath;
    const ghToken = initedOptions.ghToken;
    const ssh = initedOptions.ssh;

    const cloneOpts = { fetchOpts: {} };
    const callbacks = cloneOpts.fetchOpts.callbacks = {};

    if (os.type() === 'Darwin'/* OS X */) {
        // This is a required callback for OS X machines. There is a known issue
        // with libgit2 being able to verify certificates from GitHub.
        callbacks.certificateCheck = () => 1;
    }

    if (ghToken) {
        callbacks.certificateCheck = () => 1;
        callbacks.credentials = () => {
            // In order to authorize the clone operation, we'll need to respond to a low-level callback
            // that expects credentials to be passed.
            // This function will respond back with the OAuth token.
            return git.Cred.userpassPlaintextNew(ghToken, "x-oauth-basic");
        };
    } else if (ssh.publicKey || isSSH(url)) {
        callbacks.credentials = (repoUrl, username) => {
            // Forward user name to validate authentication.
            return git.Cred.sshKeyFromAgent(username, ssh.publicKey, ssh.privateKey, ssh.passphrase);
        };
    }

    // Convert NodeGit promise to ES Promise
    return new Promise((resolve, reject) => {
        git.Clone(url, localPath, cloneOpts).then(resolve, reject);
    });
};
