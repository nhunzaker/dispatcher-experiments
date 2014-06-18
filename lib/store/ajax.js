var url     = require('url')
var RSVP    = require('rsvp')
var request = require('superagent')
var config  = require('../../config')

module.exports = function(method, options) {

	var message = request[method](url.resolve(config.API_URL, options.url))
				.type('json')
				.set('Accept', 'application/json')

	if (options.data) {
		message = message.send(options.data)
	}

	return new RSVP.Promise(function(resolve, reject) {
		message.end(function(err, response) {
			if (err) {
				reject(err)
			} else if (response.status >= 400) {
				reject(response.error)
			} else {
				resolve(response.body)
			}
		})
	})
}
