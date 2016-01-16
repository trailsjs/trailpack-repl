'use strict'

const assert = require('assert')
const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(require('./app'))
  return global.app.start().catch(global.app.stop)
})

describe('Trails App', () => {
  it('should load', () => {
    assert(global.app)
  })
})

after(() => {
  return global.app.stop()
})
