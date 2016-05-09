const test = require('ava');

const repoName = require('../lib/repo-name');

test('should get name for http', t => {
    const url = 'http://github.com/user/repo';

    t.is(repoName(url), 'repo');
});

test('should get name for https', t => {
    const url = 'https://github.com/user/repo';

    t.is(repoName(url), 'repo');
});

test('should get name for git', t => {
    const url = 'git://github.com/user/repo.git';

    t.is(repoName(url), 'repo');
});

test('should get name for ssh', t => {
    const url = 'git@github.com:user/repo.git';

    t.is(repoName(url), 'repo');
});
