var routes     = require('./actions/routes')
var history    = require('./actions/history')
var dispatcher = require('./dispatcher')

var React      = require('react')
var App        = require('./views/app.jsx')

var Browser = {
	id: 'BROWSER',

	resolvePath: function (url) {
		return routes.request(url).then(function(response) {
			React.renderComponent(App({
				component : response.component,
				params    : response.params
			}), document.getElementById('app'))
		})
	}
}

dispatcher.register('URL_UPDATE', Browser, 'resolvePath')

window.addEventListener('popstate', function() {
	Browser.resolvePath(window.location.toString())
})

history.replace(window.location.toString())
