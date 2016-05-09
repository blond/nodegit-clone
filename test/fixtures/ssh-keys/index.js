const path = require('path');

const absolutify = path.join.bind(path, __dirname);

module.exports = {
    unsafe: {
        publicKey: absolutify('./unsafe_rsa.pub'),
        privateKey: absolutify('./unsafe_rsa')
    },
    encrypted: {
        publicKey: absolutify('./encrypted_rsa.pub'),
        privateKey: absolutify('./encrypted_rsa')
    },
    passphrase: 'test-password'
};
