var Recognizer = require('route-recognizer').default;
var url        = require('url');
var qs         = require('querystring');

var Router = function() {
	this.recognizer = new Recognizer();
};

Router.prototype = {
	match: function(callback) {
		var self = this;

		callback(function(path) {
			return {
				to: function(handler) {
					self.recognizer.add([{ path: path, handler: handler }]);
				}
			};
		});
	},

	resolve: function(path) {
		var parsed   = url.parse(path);
		var resolved = this.recognizer.recognize(parsed.pathname);

		return {
			handler   : resolved? resolved[0].handler : null,
			params    : resolved? resolved[0].params  : null,
			query     : qs.parse(decodeURI(parsed.query || '')),
			pathname  : parsed.pathname
		};
	}
}

module.exports = Router;
