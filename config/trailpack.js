/**
 * REPL Trailpack Configuration
 */
module.exports = {

  events: {
    initialize: {
      listens: [ 'trails:ready' ]
    }
  }

}
