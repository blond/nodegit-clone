import path from 'path';

const absolutify = path.join.bind(path, __dirname);

export default {
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
