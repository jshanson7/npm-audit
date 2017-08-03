# NPM Audit [![NPM version][npm-image]][npm-url]

Audit your NPM dependencies for malicious packages.  Blacklisted packages are listed in [blacklist.json](https://github.com/jshanson7/npm-audit/blob/master/blacklist.json).  Please help keep this list up-to-date.

<img src="https://raw.githubusercontent.com/jshanson7/npm-audit/master/demo.gif" width="600">

## Installation

```sh
npm install --save-dev npm-audit@latest
```

## Usage

Add scripts to your `package.json`:

```json
  ...
  "scripts": {
    "audit": "npm-audit",
    "postinstall": "npm-audit",
    "pretest": "npm-audit"
  },
  ...
```

then:

```sh
$ npm run audit
```

or call with js:

```javascript
require('npm-audit')();
```

## License

MIT

[npm-image]: https://badge.fury.io/js/npm-audit.svg
[npm-url]: https://npmjs.org/package/npm-audit
