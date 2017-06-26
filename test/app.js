const path = require('path')

module.exports = {
  pkg: {
    name: 'repl-trailpack-test'
  },
  api: {},
  config: {
    repl: {
      allowNoTTY: true
    },
    main: {
      packs: [
        require('../') // trailpack-repl
      ],
      paths: {
        temp: path.resolve(__dirname)
      }
    }
  }
}

