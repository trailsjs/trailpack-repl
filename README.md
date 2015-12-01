# trailpack-repl

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

REPL Trailpack. Adds an interactive shell to your Trails app to help with
development and debugging.

## Usage
The core trailpack should always be loaded in your trailpack config.

```js
// config/trailpack.js
module.exports = {
  // ...
  packs: [
    // ...
    require('trailpack-repl')
  ]
}
```

## Contributing
We love contributions! In order to be able to review your code efficiently,
please keep the following in mind:

1. Pull Requests (PRs) must include new and/or updated tests, and all tests [must pass](https://travis-ci.org/trailsjs/trailpack-repl).
2. Use `eslint`! See the `eslintConfig` in [package.json](https://github.com/trailsjs/trailpack-repl/blob/master/package.json).
3. Please [reference the relevant issue](https://github.com/blog/1506-closing-issues-via-pull-requests) in your Pull Request.

## License
[MIT](https://github.com/trailsjs/trailpack-repl/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/trailpack-repl.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-repl
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-repl/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack-repl
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack-repl.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack-repl
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-repl.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-repl
