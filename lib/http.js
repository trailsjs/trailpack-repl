'use strict'

const _ = require('lodash')
const http = require('http')
const config = require('../config')

module.exports = {

  /**
   * Initialize the module to access REPL trailpack
   * Need to access to the log and config later
   */
  init (app) {
    this.app = app
  },
  /**
   * Exectute a GET http request
   * @param url to fetch
   */
  get (url) {
    this.request('get', url, null, null)
  },

  /**
   * Exectute a POST http request
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   */
  post (url, params, contentType) {
    contentType = contentType || 'application/json'
    this.request('post', url, params, contentType)
  },

  /**
   * Exectute a PUT http request
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   */
  put (url, params, contentType) {
    contentType = contentType || 'application/json'
    this.request('put', url, params, contentType)
  },

  /**
   * Exectute a DELETE http request
   * @param url to fetch
   */
  delete (url) {
    this.request('delete', url, null, null)
  },

  /**
   * Exectute an http request
   * @param method to exectute (GET, POST, PUT, DELETE)
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   */
  request (method, url, params, contentType) {
    const log = this.app.log

    if (!url.startsWith('/')) {
      url = '/' + url
    }

    const configExtends = _.extend(config, this.app.config.repl || {})

    const options = {
      host: 'localhost',
      port: this.app.config.web.port,
      method: method,
      path: url
    }

    if (params != null && typeof params != 'string') params = JSON.stringify(params)

    if (contentType != null) {
      options.headers = {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(params)
      }
    }

    const request = http.request(options, function (resp) {
      let body = ''
      resp.setEncoding(configExtends.httpEncoding)

      resp.on('data', function (chunk) {
        body += chunk
      })

      resp.on('end', function () {
        const response = JSON.parse(body)
        log.info(response)
      }.bind(this))

    }.bind(this)).on('error', function (e) {
      log.error('Got error: ' + e.message)
    }.bind(this))

    if (params) {
      request.write(params)
    }
    request.end()
  }
}

