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
  }

  initialize() {
    this.app.once('trails:ready', () => {
      try {
        this.server = repl.start({
          // green prompt
          prompt: '\u001b[1;32mtrails > \u001b[0m',
          useColors: true
        })
        this.app.emit('repl:started')
      }
      catch (e) {
        this.log.error(e)
        this.log.warn('trailpack-repl: Disabling REPL.')
        return
      }

      try {
        console.log(this.historyFile)
        fs.statSync(this.historyFile)
        fs.readFileSync(this.historyFile).toString()
          .split('\n')
          .reverse()
          .filter(line => line.trim())
          .map(line => this.server.history.push(line))
      }
      catch (e) {
        console.log(e)
        this.log.silly('Could not read REPL history file. This is strange, but not fatal')
      }

      this.server.once('exit', () => {
        this.app.stop().then(() => process.exit())
      })

      this.server.context.app = this.app
      this.server.context.get = lib.Http.get.bind(lib.Http)
      this.server.context.post = lib.Http.post.bind(lib.Http)
      this.server.context.put = lib.Http.put.bind(lib.Http)
      this.server.context.delete = lib.Http.delete.bind(lib.Http)
      this.server.context.patch = lib.Http.patch.bind(lib.Http)
      this.server.context.head = lib.Http.head.bind(lib.Http)
      this.server.context.options = lib.Http.options.bind(lib.Http)
    })

  }

  unload () {
    try {
      fs.appendFileSync(this.historyFile, this.server.lines.join('\n'))
    }
    catch (e) {
      this.app.log.warn(e)
      this.app.log.warn('Could not create REPL history file. This is strange, but not fatal.')
    }

    this.server.removeAllListeners('exit')
    this.server.close()

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

