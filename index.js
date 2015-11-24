'use strict'

const Trailpack = require('trailpack')
const repl = require('repl')
const _ = require('lodash')

module.exports = class Core extends Trailpack {

  getName () {
    return 'repl'
  }

  configure () {
    this.specialVar = '$$'
    return Promise.resolve()
  }

  initialize () {
    this.server = repl.start({
      // green prompt
      prompt: '\u001b[1;32mtrails > \u001b[0m',
      useColors: true,
      useGlobal: true
    })

    this.server.on('exit', err => {
      this.app.stop(err ? 1 : 0)
    })

    return Promise.resolve()
  }
}
