const { parseArn } = require('arn2');

function arn2url(arn, callback = Array) {
  return parseArn(arn, (err, result) => {
    if (err) {
      return callback(err);
    }

    const { service } = result;

    switch (service) {
      case 'cloudformation': {
        const { region, arn, resourceType } = result;

        switch (resourceType) {
          case 'stack':
            return callback(null, `https://${region}.console.aws.amazon.com/cloudformation/home#/stack/detail/?stackId=${arn}`);

          case 'changeSet':
            return callback(null, `https://${region}.console.aws.amazon.com/cloudformation/home#/changeset/detail/?changeSetId=${arn}`);

          default:
            return callback(null, `https://${region}.console.aws.amazon.com/cloudformation/home`);
        }
      }

      case 'iam': {
        const { resource, resourceType } = result;

        switch (resourceType) {
          case 'user':
            return callback(null, `https://console.aws.amazon.com/iam/home#/users/${resource}`);

          case 'group':
            return callback(null, `https://console.aws.amazon.com/iam/home#/groups/${resource}`);

          case 'role':
            return callback(null, `https://console.aws.amazon.com/iam/home#/roles/${resource}`);

          case 'policy':
            return callback(null, `https://console.aws.amazon.com/iam/home#/policies/${result.arn}`);

          case 'oidc-provider':
            return callback(null, `https://console.aws.amazon.com/iam/home#/providers/${result.arn}`);

          default:
            return callback(null, 'https://console.aws.amazon.com/iam/home');
        }
      }

      case 's3': {
        const { s3: { bucket, key } } = result;

        return callback(null, key !== undefined
          ? `https://s3.console.aws.amazon.com/s3/object/${bucket}/${key}`
          : `https://s3.console.aws.amazon.com/s3/buckets/${bucket}`);
      }

      default:
        return callback(null, result);
    }
  });
}

/*
 * Exports.
 */
exports.arn2url = arn2url;
