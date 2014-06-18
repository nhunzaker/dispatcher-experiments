var ajax    = require('./ajax')
var methods = require('./methods')

module.exports = function(method, entity, options) {
	options = options || {}

	options.url  = options.url  || entity.toURL()

	return ajax(methods[method], options)
}
