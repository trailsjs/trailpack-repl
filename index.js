'use strict'

const Trailpack = require('trailpack')
const repl = require('repl')
const lib = require('./lib')

/**
 * @class REPL
 */
module.exports = class REPL extends Trailpack {

  constructor (app, config) {
    super(app, require('./config'))
  }

  configure () {
    lib.Inspect.configureApp(this.app)
    lib.Inspect.configureApi(this.app.api)
    lib.Inspect.configurePacks(this.app.packs)

    return Promise.resolve()
  }

  initialize () {
    this.app.after('trails:ready').then(() => {
      this.server = repl.start({
        // green prompt
        prompt: '\u001b[1;32mtrails > \u001b[0m',
        useColors: true
      })

      this.server.on('exit', err => {
        this.app.stop(err ? 1 : 0)
      })

      this.server.context.app = this.app
    })

    return Promise.resolve()
  }
}
