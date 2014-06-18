var path = require('path')
var errorHandler = require('errorhandler')

require('colors')

require('node-jsx').install({
	harmony: true,
	extension: '.jsx'
})

var express = require('express')

module.exports = function() {
	var app = express()

	app.set('view engine', 'ejs')

	if ('development' === app.get('env')) {
		app.use(errorHandler())
	}

	app.use(function(req, res, next) {
		var color = 'blue'

		if (req.url.match('/data')) {
			color = 'green'
		}

		if (req.url.match('/assets')) {
			color = 'grey'
		}

		console.log(req.method.grey, req.url[color])

		next()
	})

	app.use('/data', express.static(path.resolve(__dirname, '..', 'assets/data')))
	app.use('/assets', express.static(path.resolve(__dirname, '..', 'assets')))

	return app
}
