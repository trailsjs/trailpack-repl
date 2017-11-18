const assert = require('assert')
const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(require('./app'))
  return global.app.start()
})

describe('Trails App', () => {
  it('should load', () => {
    assert(global.app)
  })
})

describe('REPL', () => {
  describe('history', () => {
    let repl
    before(() => {
      repl = global.app.packs.repl.server
    })
    it('should load history from historyFile', () => {
      assert.equal(repl.history.length, 3)
      assert.equal(repl.history[2], 'var a = 1')
      assert.equal(repl.history[1], 'var b = 1')
      assert.equal(repl.history[0], 'var c = 1')
    })
  })

})

after(() => {
  return global.app.stop()
})
