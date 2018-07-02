# arn2url

Convert ARNs to URLs.

## Installation

```
npm i arn2url
```

## Usage

``` javascript
const { arn2url } = require('arn2url');

const [err, url] = arn2url('arn:aws:s3:::example-bucket');

// Or

arn2url('arn:aws:s3:::example-bucket', (err, url) => {
  // Do something
});
```

## License

MIT
