var ajax    = require('./ajax');
var methods = require('./methods')

module.exports = function(method, entity, options) {
	options = options || {};

	options.method = options.method || methods[method];
	options.url    = options.url    || entity.url;

	return ajax(options);
};
