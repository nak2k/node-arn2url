const { parseArn } = require('arn2');

function arn2url(arn, callback = Array) {
  return parseArn(arn, (err, result) => {
    if (err) {
      return callback(err);
    }

    const { service } = result;

    switch (service) {
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
