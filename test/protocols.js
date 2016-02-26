import test from 'ava';
import { Repository } from 'nodegit';

import clone   from '../src/clone';
import sshKeys from './fixtures/ssh-keys';
import tmpdirs from './utils/tmpdirs';

const tmps = tmpdirs();
const tmpdir = tmps.tmpdir.bind(tmpdirs);

test.after('clear', () => tmps.clear());

test('should clone repository with http', async t => {
    const repo = await clone({ url: 'http://github.com/nodegit/test', localPath: tmpdir() });

    t.ok(repo instanceof Repository);
});

test('should clone repository with https', async t => {
    const repo = await clone({ url: 'https://github.com/nodegit/test', localPath: tmpdir() });

    t.ok(repo instanceof Repository);
});

test('should clone repository with git', async t => {
    const repo = await clone({ url: 'git://github.com/nodegit/test.git', localPath: tmpdir() });

    t.ok(repo instanceof Repository);
});

test('should clone repository with ssh', async t => {
    const repo = await clone({ url: 'git@github.com:nodegit/test.git', localPath: tmpdir() });

    t.ok(repo instanceof Repository);
});

test('should clone repository with ssh while manually loading a key', async t => {
    const repo = await clone({
        url: 'git@github.com:nodegit/test.git',
        localPath: tmpdir(),
        ssh: {
            publicKey: sshKeys.unsafe.publicKey,
            privateKey: sshKeys.unsafe.privateKey
        }
    });

    t.ok(repo instanceof Repository);
});

test('should clone repository with ssh while manually loading an encrypted key', async t => {
    const repo = await clone({
        url: 'git@github.com:nodegit/test.git',
        localPath: tmpdir(),
        ssh: {
            publicKey: sshKeys.encrypted.publicKey,
            privateKey: sshKeys.encrypted.privateKey,
            passphrase: sshKeys.passphrase
        }
    });

    t.ok(repo instanceof Repository);
});
