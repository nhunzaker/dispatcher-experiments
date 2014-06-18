var RSVP       = require('rsvp')
var url        = require('url')
var qs         = require('querystring')
var Recognizer = require('route-recognizer').default

var Router = function(routes) {
	if (this instanceof Router === false) {
		return new Router(routes)
	}

	this.recognizer = new Recognizer()
	this.match(routes)
}

Router.prototype = {
	match: function(object) {
		if (object) {
			for (var o in object) {
				this.recognizer.add([{
					path: o,
					handler: object[o]
				}]);
			}
		}

		return this
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
	},

	dispatch: function(url) {
		var action  = this.resolve(url)
		var handler = action.handler? action.handler : this.resolve('404')
		var router = this

		return new RSVP.Promise(function(resolve, reject) {
			handler(action ? action.params : null).then(resolve, reject)
		}).catch(function(error) {
			console.error(error)
			return router.dispatch('500')
		})
	}
}

module.exports = Router
