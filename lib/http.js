const merge = require('lodash.merge')
const http = require('http')
const config = require('../config')

module.exports = {

  /**
   * Initialize the module to access REPL trailpack
   * Need to access to the log and config later
   */
  init (app){
    this.app = app
  },
  /**
   * Exectute a GET http request
   * @param url to fetch
   * @param headers of the request
   */
  get (url, headers) {
    this.request('get', url, null, null, headers)
  },

  /**
   * Exectute a OPTIONS http request
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   * @param headers of the request
   */
  options (url, params, contentType, headers){
    this.request('options', url, params, contentType, headers)
  },

  /**
   * Exectute a HEAD http request
   * @param url to fetch
   * @param headers of the request
   */
  head (url, headers) {
    this.request('head', url, null, null, headers)
  },

  /**
   * Exectute a POST http request
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   * @param headers of the request
   */
  post (url, params, contentType, headers){
    contentType = contentType || 'application/json'
    this.request('post', url, params, contentType, headers)
  },

  /**
   * Exectute a PATCH http request
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   * @param headers of the request
   */
  patch (url, params, contentType, headers){
    contentType = contentType || 'application/json'
    this.request('patch', url, params, contentType, headers)
  },

  /**
   * Exectute a PUT http request
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   * @param headers of the request
   */
  put (url, params, contentType, headers) {
    contentType = contentType || 'application/json'
    this.request('put', url, params, contentType, headers)
  },

  /**
   * Exectute a DELETE http request
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   * @param headers of the request
   */
  delete (url, params, contentType, headers) {
    contentType = contentType || 'application/json'
    this.request('delete', url, params, contentType, headers)
  },

  /**
   * Exectute an http request
   * @param method to exectute (GET, POST, PUT, DELETE)
   * @param url to fetch
   * @param params to send
   * @param contentType of the params (default to 'application/json')
   * @param headers of the request
   */
  request (method, url, params, contentType, headers) {
    const log = this.app.log
    headers = headers || {'Accept': 'application/json'}

    if (!url.startsWith('/')) {
      url = '/' + url
    }

    const configExtends = Object.assign(config, this.app.config.repl || {})

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

    if (headers != null) {
      options.headers = merge(headers, options.headers)
    }

    const request = http.request(options, (resp) => {
      let body = ''
      resp.setEncoding(configExtends.httpEncoding)

      resp.on('data', (chunk) => {
        body += chunk
      })

      resp.on('end', () => {
        try {
          const response = JSON.parse(body)
          log.info(resp.statusCode, response)
        }
        catch (e) {
          log.info(resp.statusCode, body)
        }
      })

    }).on('error', (e) => {
      log.error('Got error: ' + e.message)
    })

    if (params) {
      request.write(params)
    }
    request.end()
  }
}
