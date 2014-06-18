var server = require('./setup')()
var config = require('../config')
var routes = require('../actions/routes')
var React  = require('react')
var App    = require('../views/app.jsx')

server.get('*', function(req, res) {

	routes.request(req.url).then(function(response) {
		var component = App({
			component : response.component,
			params    : response.params
		})

		res.render('layout', {
			app     : '', //React.renderComponentToString(component),
			seed    : response.data || {}
		})

	}).catch(function(error) {
		console.error('ERROR'.red, error)

		if ('status' in error) {
			res.send(error.status)
		} else {
			res.send(500, error)
		}
	})
})

server.listen(config.PORT, function() {
	console.log('\nServer is listening on port', config.PORT.toString().magenta)
})
