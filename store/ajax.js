var RSVP    = require('rsvp');
var request = require('superagent');

module.exports = function(options) {
	var message = request[options.method](options.url)
				.type(options.type || 'json')
				.set('Accept', 'application/json')
				.set(options.headers || {})
				.send(options.data)

	return new RSVP.Promise(function(resolve, reject) {
		message.end(function(err, response) {
			err? reject(err) : resolve(response.body);
		});
	});
}
