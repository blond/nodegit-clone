const path = require('path');

const test = require('ava');
const fs = require('fs-extra');
const promisify = require('es6-promisify');

const clone = require('../lib/clone');
const tmpdirs = require('./utils/tmpdirs');

const outputFile = promisify(fs.outputFile);
const tmps = tmpdirs();
const tmpdir = tmps.tmpdir.bind(tmpdirs);

test.after('clear', () => tmps.clear());

test('should throw error if local store of repository already exists', t => {
    const url = 'git://github.com/nodegit/fake.git';
    const workdir = tmpdir();

    return t.throws(
        occupy(workdir).then(() => clone({ url: url, localPath: workdir }))
    );
});

test('should throw error if repository does not exist', t => {
    return t.throws(
        clone({ url: 'git://github.com/nodegit/fake.git', localPath: tmpdir() })
    );
});

test('should throw error if page does not exist', t => {
    return t.throws(
        clone({ url: 'http://github.com/nodegit/fake', localPath: tmpdir() })
    );
});

/**
 * @param {String} dir — path to dir.
 * @returns {Promise}
 */
function occupy(dir) {
    const filename = path.join(dir, 'some-file.txt');

    return outputFile(filename, 'text');
}
