var server = require('./setup')()
var config = require('../config')
var router = require('../router')
var React  = require('react')
var App    = require('../views/app.jsx')

server.get('*', function(req, res) {

	router.dispatch(req.url).then(function(response) {
		var component = App({
			component : response.component,
			params    : response.params
		})

		console.log(response.data)

		res.render('layout', {
			app     : React.renderComponentToString(component),
			seed    : response.data || {}
		})
	}).catch(function(error) {
		console.error('ERROR'.red, req.url.magenta, "-", error)

		if ('status' in error) {
			res.send(error.status)
		} else {
			res.error(error)
		}
	})
})

server.listen(config.PORT, function() {
	console.log('\nServer is listening on port', config.PORT.toString().magenta)
})
