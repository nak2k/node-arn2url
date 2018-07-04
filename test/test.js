const test = require('tape');
const { arn2url } = require('..');

test('test iam', t => {
  t.plan(5);

  t.deepEqual(arn2url('arn:aws:iam::123456789012:root'),
    [null, 'https://console.aws.amazon.com/iam/home']);

  t.deepEqual(arn2url('arn:aws:iam::123456789012:user/Bob'),
    [null, 'https://console.aws.amazon.com/iam/home#/users/Bob']);

  t.deepEqual(arn2url('arn:aws:iam::123456789012:group/Developers'),
    [null, 'https://console.aws.amazon.com/iam/home#/groups/Developers']);

  t.deepEqual(arn2url('arn:aws:iam::123456789012:role/S3Access'),
    [null, 'https://console.aws.amazon.com/iam/home#/roles/S3Access']);

  t.deepEqual(arn2url('arn:aws:iam::123456789012:policy/UsersManageOwnCredentials'),
    [null, 'https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::123456789012:policy/UsersManageOwnCredentials']);
});

test('test s3', t => {
  t.plan(2);

  t.deepEqual(arn2url('arn:aws:s3:::example-bucket'),
    [null, 'https://s3.console.aws.amazon.com/s3/buckets/example-bucket']);

  t.deepEqual(arn2url('arn:aws:s3:::example-bucket/file'),
    [null, 'https://s3.console.aws.amazon.com/s3/object/example-bucket/file']);
});
