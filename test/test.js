const test = require('tape');
const { arn2url } = require('..');

test('test s3', t => {
  t.plan(2);

  t.deepEqual(arn2url('arn:aws:s3:::example-bucket'),
    [null, 'https://s3.console.aws.amazon.com/s3/buckets/example-bucket']);

  t.deepEqual(arn2url('arn:aws:s3:::example-bucket/file'),
    [null, 'https://s3.console.aws.amazon.com/s3/object/example-bucket/file']);
});
