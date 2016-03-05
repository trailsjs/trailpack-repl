'use strict'

const repl = require('repl')
const Trailpack = require('trailpack')
const lib = require('./lib')

/**
 * @class REPL
 *
 * Provide an interactive Javascript shell for Trails applications
 *
 * @see {@link https://nodejs.org/api/repl.html#repl_repl}
 */
module.exports = class REPL extends Trailpack {

  configure() {
    lib.Inspect.configureApp(this.app)
    lib.Inspect.configureApi(this.app.api)
    lib.Inspect.configurePacks(this.app.packs)
    lib.Http.init(this.app)
  }

  initialize() {

    this.app.once('trails:ready', () => {
      try {
        this.server = repl.start({
          // green prompt
          prompt: '\u001b[1;32mtrails > \u001b[0m',
          useColors: true
        })
      }
      catch (e) {
        this.log.warn('trailpack-repl: Disabling REPL.')
        this.log.error(e)
        return
      }

      this.server.once('exit', () => {
        this.app.stop().then(() => process.exit())
      })

      this.server.context.app = this.app
      this.server.context.get = lib.Http.get.bind(lib.Http)
      this.server.context.post = lib.Http.post.bind(lib.Http)
      this.server.context.put = lib.Http.put.bind(lib.Http)
      this.server.context.delete = lib.Http.delete.bind(lib.Http)
    })

  }

  unload () {
    this.server.removeAllListeners()
    this.server.close()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      pkg: require('./package')
    })
  }
}

