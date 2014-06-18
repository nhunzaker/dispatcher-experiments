var Recognizer = require('route-recognizer').default
var url        = require('url')
var qs         = require('querystring')

var Router = function() {
	this.recognizer = new Recognizer()
}

Router.prototype = {
	match: function(object) {
		for (var o in object) {
			this.recognizer.add([{
				path: o,
				handler: object[o]
			}]);
		}
	},

	resolve: function(path) {
		var parsed   = url.parse(path)
		var resolved = this.recognizer.recognize(parsed.pathname)

		return {
			handler   : resolved? resolved[0].handler : null,
			params    : resolved? resolved[0].params  : null,
			query     : qs.parse(decodeURI(parsed.query || '')),
			pathname  : parsed.pathname
		}
	}
}

module.exports = Router
