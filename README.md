# NPM Audit [![NPM version][npm-image]][npm-url]

Audit your NPM dependencies for malicious packages.  Blacklisted packages are listed in [blacklist.json](https://github.com/jshanson7/npm-audit/blob/master/blacklist.json).  Please help keep this list up-to-date.

<img src="https://user-images.githubusercontent.com/2469458/28900713-280dff1c-77a8-11e7-949f-9e236448bbda.png" width="600">

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

<img src="https://user-images.githubusercontent.com/2469458/28900698-110650b2-77a8-11e7-97f2-45f87e8d69b6.gif" width="600">

or call it with js:

```javascript
require('npm-audit')();
```

## License

MIT

[npm-image]: https://badge.fury.io/js/npm-audit.svg
[npm-url]: https://npmjs.org/package/npm-audit
