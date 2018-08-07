const test = require('tape');
const { arn2url } = require('..');

test('test cloudformation', t => {
  t.plan(2);

  t.deepEqual(arn2url('arn:aws:cloudformation:us-west-2:123456789012:stack/my-stack/12345678-1234-1234-1234-123456789012'),
    [null, 'https://us-west-2.console.aws.amazon.com/cloudformation/home#/stack/detail/?stackId=arn:aws:cloudformation:us-west-2:123456789012:stack/my-stack/12345678-1234-1234-1234-123456789012']);

  t.deepEqual(arn2url('arn:aws:cloudformation:us-west-2:123456789012:changeSet/my-stack/12345678-1234-1234-1234-123456789012'),
    [null, 'https://us-west-2.console.aws.amazon.com/cloudformation/home#/changeset/detail/?changeSetId=arn:aws:cloudformation:us-west-2:123456789012:changeSet/my-stack/12345678-1234-1234-1234-123456789012']);
});

test('test dynamodb', t => {
  t.plan(2);

  t.deepEqual(arn2url('arn:aws:dynamodb:us-west-2:123456789012:table/my-table'),
    [null, 'https://us-west-2.console.aws.amazon.com/dynamodb/home#tables:selected=my-table']);

  t.deepEqual(arn2url('arn:aws:dynamodb:us-west-2:123456789012:table/my-table/stream/test'),
    [null, 'https://us-west-2.console.aws.amazon.com/dynamodb/home#tables:selected=my-table']);
});

test('test iam', t => {
  t.plan(6);

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

  t.deepEqual(arn2url('arn:aws:iam::123456789012:oidc-provider/accounts.google.com'),
    [null, 'https://console.aws.amazon.com/iam/home#/providers/arn:aws:iam::123456789012:oidc-provider/accounts.google.com']);
});

test('test lambda', t => {
  t.plan(1);

  t.deepEqual(arn2url('arn:aws:lambda:us-east-1:123456789012:function:Test'),
    [null, 'https://us-east-1.console.aws.amazon.com/lambda/home#/functions/Test']);
});

test('test logs', t => {
  t.plan(4);

  t.deepEqual(arn2url('arn:aws:logs:us-east-1:*:*'),
    [null, 'https://us-east-1.console.aws.amazon.com/cloudwatch/home#logs:']);

  t.deepEqual(arn2url('arn:aws:logs:us-east-1:123456789012:*'),
    [null, 'https://us-east-1.console.aws.amazon.com/cloudwatch/home#logs:']);

  t.deepEqual(arn2url('arn:aws:logs:us-east-1:123456789012:log-group:my-log-group'),
    [null, 'https://us-east-1.console.aws.amazon.com/cloudwatch/home#logStream:group=my-log-group']);

  t.deepEqual(arn2url('arn:aws:logs:us-east-1:123456789012:log-group:my-log-group:log-stream:my-log-stream'),
    [null, 'https://us-east-1.console.aws.amazon.com/cloudwatch/home#logEventViewer:group=my-log-group;stream=my-log-stream']);

});

test('test s3', t => {
  t.plan(2);

  t.deepEqual(arn2url('arn:aws:s3:::example-bucket'),
    [null, 'https://s3.console.aws.amazon.com/s3/buckets/example-bucket']);

  t.deepEqual(arn2url('arn:aws:s3:::example-bucket/file'),
    [null, 'https://s3.console.aws.amazon.com/s3/object/example-bucket/file']);
});

test('test sns', t => {
  t.plan(2);

  t.deepEqual(arn2url('arn:aws:sns:us-east-1:123456789012:my_topic'),
    [null, 'https://us-east-1.console.aws.amazon.com/sns/v2/home#/topics/arn:aws:sns:us-east-1:123456789012:my_topic']);

  t.deepEqual(arn2url('arn:aws:sns:us-east-1:123456789012:my_topic:12345678-1234-1234-1234-123456789012'),
    [null, 'https://us-east-1.console.aws.amazon.com/sns/v2/home#/subscriptions']);
});

test('test sqs', t => {
  t.plan(1);

  t.deepEqual(arn2url('arn:aws:sqs:us-east-1:123456789012:my-queue'),
    [null, 'https://console.aws.amazon.com/sqs/home?region=us-east-1#view-messages:selected=https://sqs.us-east-1.amazonaws.com/123456789012/my-queue']);
});
