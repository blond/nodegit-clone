import path from 'path';
import test from 'ava';

import init from '../src/init';

test('should support url as string', t => {
    const { url } = init('url');

    t.is(url, 'url');
});

test('should throw error if options is not specified', t => {
    t.throws(() => init());
});

test('should throw error if url is not specified', t => {
    t.throws(() => init({}), 'You should specify url to repository.');
});

test('should resolve local path', t => {
    const { localPath } = init({ url: 'url', localPath: './my-repo' });

    t.is(localPath, path.resolve('./my-repo'));
});

test('should support absolute path', t => {
    const workdir = path.resolve('./my-repo');
    const { localPath } = init({ url: 'url', localPath: workdir });

    t.is(localPath, workdir);
});

test('should get local path by url', t => {
    const { localPath } = init({ url: 'https://github.com/owner/my-repo' });

    t.is(localPath, path.resolve('./my-repo'));
});
