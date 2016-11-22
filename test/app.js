'use strict'

const path = require('path')
const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'repl-trailpack-test'
  },
  api: {
  },
  config: {
    main: {
      packs: [
        //smokesignals.Trailpack,
        require('../') // trailpack-repl
      ],
      paths: {
        temp: path.resolve(__dirname)
      }
    }
  }
}, smokesignals.FailsafeConfig)


