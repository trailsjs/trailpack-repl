# trailpack-repl

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

[REPL](https://nodejs.org/api/repl.html) Trailpack. Adds an interactive shell to your Trails app to help with
development and debugging. Saves command history between sessions.

## Usage
The repl trailpack is loaded in your trailpack config per usual.

```js
// config/main.js
module.exports = {
  // ...
  packs: [
    // ...
    require('trailpack-repl')
  ]
}
```

```js
// config/repl.js
module.exports = {
  /**
   * REPL is disabled automatically if no text terminal is available. Set
   * to "true" to override this behavior.
   */
  allowNoTTY: false
}
```

## Shell Commands
With the [REPL Trailpack](https://github.com/trailsjs/trailpack-repl) you can test your REST API directly from the interactive shell.

### GET 
`get("/api/v1/default/info")`

### HEAD 
`head("/api/v1/default/info")`

### OPTIONS 
`options("/api/v1/default/info")`

### POST
`post("/api/v1/default/info", {some : 'data'})`

If you want to simulate some HTML form you can do : 

`post("/api/v1/default/info", 'some=data', 'application/x-www-form-urlencoded')`
### PUT 
`put("/api/v1/default/info", {some : 'data'})`

If you want to simulate some HTML form you can do : 

`put("/api/v1/default/info", 'some=data', 'application/x-www-form-urlencoded')`

### PATCH 
`patch("/api/v1/default/info", {some : 'data'})`

### DELETE 
`delete("/api/v1/default/info")`

By default headers are `{'Accept': 'application/json'}` but they can be modified by adding an extra param of each method like this :

```
get("/api/v1/default/info", {'Accept': 'text/xml'})
head("/api/v1/default/info", {'Accept': 'text/xml'})
options("/api/v1/default/info", 'some=data', 'application/x-www-form-urlencoded', {'Accept': 'text/xml'})
post("/api/v1/default/info", 'some=data', 'application/x-www-form-urlencoded', {'Accept': 'text/xml'})
put("/api/v1/default/info", 'some=data', 'application/x-www-form-urlencoded', {'Accept': 'text/xml'})
patch("/api/v1/default/info", 'some=data', 'application/x-www-form-urlencoded', {'Accept': 'text/xml'})
delete("/api/v1/default/info", 'some=data', 'application/x-www-form-urlencoded', {'Accept': 'text/xml'})
```

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

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
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

