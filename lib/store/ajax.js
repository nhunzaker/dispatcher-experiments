var RSVP    = require('rsvp')
var request = require('superagent')
var _cache  = {}

module.exports = function(options) {
	var message = request[options.method](options.url)
				.type(options.type || 'json')
				.set('Accept', 'application/json')
				.set(options.headers || {})
				.send(options.data)

	return new RSVP.Promise(function(resolve, reject) {
		var cached = _cache[options.url]

		if (cached) return resolve(cached)

		message.end(function(err, response) {
			if (err) return reject(err)

			_cache[options.url] = response.body

			resolve(response.body)
		})
	})
};
