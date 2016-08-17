'use strict'

const fs = require('fs')
const path = require('path')
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

    if (!this.config.historyFileName) {
      this.config.historyFileName = '.node_repl_history'
    }

    this.historyFile = path.resolve(this.app.config.main.paths.temp, this.config.historyFileName)

    this.log.debug('historyFile', this.historyFile)
  }

  initialize() {

    if (process.stdout.isTTY || this.app.config.repl.allowNoTTY) {
      try {
        this.server = repl.start({
          prompt: '',
          useColors: true,
          replMode: repl.REPL_MODE_STRICT
        })
        this.server.pause()
        this.app.once('trails:ready', () => {
          // green prompt
          this.server.setPrompt('\u001b[1;32mtrails > \u001b[0m')
          this.server.resume()
          this.server.write('', {name: 'return'})
        })
      }
      catch (e) {
        this.log.error(e)
        this.log.warn('trailpack-repl: Disabling REPL.')
        return
      }

      try {
        fs.statSync(this.historyFile)
        fs.readFileSync(this.historyFile).toString()
            .split('\n')
            .reverse()
            .filter(line => line.trim())
            .map(line => this.server.history.push(line))
      }
      catch (e) {
        this.log.silly('Could not read REPL history file at', this.historyFile)
        this.log.silly('No problem, a history file will be created on shutdown')
      }

      this.server.once('exit', () => {
        this.app.stop().then(() => process.exit())
      })

      this.server.context.app = this.app

      // TODO https://github.com/trailsjs/trailpack-repl/issues/33
      this.server.context.get = lib.Http.get.bind(lib.Http)
      this.server.context.post = lib.Http.post.bind(lib.Http)
      this.server.context.put = lib.Http.put.bind(lib.Http)
      this.server.context.delete = lib.Http.delete.bind(lib.Http)
      this.server.context.patch = lib.Http.patch.bind(lib.Http)
      this.server.context.head = lib.Http.head.bind(lib.Http)
      this.server.context.options = lib.Http.options.bind(lib.Http)
    }
    else {
      this.log.warn('REPL not started because environment not allow them, set config.repl.allowNoTTY=true to force')
    }
  }

  unload () {
    this.server.removeAllListeners('exit')
    this.server.close()

    try {
      const lines = (this.server.history || [ ])
        .reverse()
        .filter(line => line.trim())
        .join('\n')

      fs.writeFileSync(this.historyFile, lines)
    }
    catch (e) {
      this.app.log.debug(e)
      this.app.log.warn('Could not create REPL history file at', this.historyFile)
      this.app.log.warn('This is strange, but not fatal. Set loglevel to "debug" for more info')
    }

    lib.Inspect.unconfigureApp(this.app)
    lib.Inspect.unconfigureApi(this.app.api)
    lib.Inspect.unconfigurePacks(this.app.packs)
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      pkg: require('./package')
    })
  }
}

