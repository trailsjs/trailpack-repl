'use strict'

const Trailpack = require('trailpack')
const repl = require('repl')
const _ = require('lodash')

module.exports = class Core extends Trailpack {

  getName () {
    return 'repl'
  }

  initialize () {
    this.app.after('trailpack:all:initialized').then(() => {
      console.log()
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

    return this.app.after('trailpack:core:initialized')
  }
}
