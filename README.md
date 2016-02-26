nodegit-clone
=============

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]

[npm]:            https://www.npmjs.org/package/nodegit-clone
[npm-img]:        https://img.shields.io/npm/v/nodegit-clone.svg

[travis]:         https://travis-ci.org/blond/nodegit-clone
[test-img]:       https://img.shields.io/travis/blond/nodegit-clone.svg?label=tests

[coveralls]:      https://coveralls.io/r/blond/nodegit-clone
[coverage-img]:   https://img.shields.io/coveralls/blond/nodegit-clone.svg

[david]:          https://david-dm.org/blond/nodegit-clone
[dependency-img]: http://img.shields.io/david/blond/nodegit-clone.svg

Clone git repository with [nodegit](http://www.nodegit.org/).

Install
-------

```
$ npm install --save nodegit-clone
```

Usage
-----

```js
import clone from 'nodegit-clone';

clone('https://github.com/owner/repo')
    .then(repo => {
        // Access any repository methods here.
        console.log(repo.path());
    });

// path/to/repo/.git
```

API
---

### clone({ url, [localPath], [ghToken], [ssh] })

Returns a Promise, that resolves to instance of [Repository](http://www.nodegit.org/api/repository/).

#### url

Type: `string`

The URL to the repository.

**Note:** the following protocols are supported: `http`, `https`, `git` and `ssh`.

```js
clone('http://github.com/owner/repo');
clone('https://github.com/owner/repo');
clone('git://github.com/owner/repo.git');
clone('git@github.com:owner/repo.git');
```

#### localPath

Type: `string`

The Local path to store repository.

**Note:** if `localPath` is not specified then repository will be cloned to directory with repository name.

#### ghToken

Type: `string`

The GitHub personal OAuth token.

#### ssh

Type: `object`

The object with paths to ssh keys and passphrase.

GitHub Private Repositories
---------------------------

Before you can clone a repository, you'll need a GitHub OAuth application token. You can find more information on generating one here: [Creating an access token for command-line use](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).

In this example we're going to clone one of our private test repositories from GitHub. This must be an https protocol URL for the clone to work.

```js
// Keep this value a secret. If you accidentally commit
// this key to a public GitHub repository they will immediately revoke it.
const GITHUB_TOKEN = '<GH_TOKEN>';

clone({
    url: 'https://github.com/owner/private',
    ghToken: GITHUB_TOKEN
});
```

SSH Keys
--------

Before you can clone a repository, you'll need SSH keys. You can find more information on generating them here: [Generating an SSH key](https://help.github.com/articles/generating-an-ssh-key/).

In this example we're going to clone one of our private test repositories. This must be an ssh protocol URL for the clone to work.

```js
clone({
    url: 'git@github.com:owner/private.git',
    ssh: {
        publicKey: '/path/to/public-key',
        privateKey: '/path/to/private-key'
    }
});
```

For encrypted keys you should specify the `passphrase` option:

```js
clone({
    url: 'git@github.com:owner/private.git',
    ssh: {
        publicKey: '/path/to/public-key',
        privateKey: '/path/to/private-key',
        passphrase: 'password'
    }
});
```

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
