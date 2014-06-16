var routes = require('./routes')
var dispatcher = require('./dispatcher')

var action = routes.resolve(window.location.pathname)

require('./stores/os')
require('./stores/path')
require('./stores/url')

dispatcher.dispatch(action.handler).then(function(d) {
	console.log(d)
})
