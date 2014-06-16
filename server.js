require('colors')

require('node-jsx').install({
	harmony: true,
	extension: '.jsx'
})

var express = require('express')
var app = express()
var routes = require('./routes')
var dispatcher = require('./dispatcher')

app.set('view engine', 'ejs')

require('./stores/os')
require('./stores/path')
require('./stores/url')

var React  = require('react')
var Layout = require('./views/layout.jsx')

app.use(express.static(__dirname + '/assets/'))

app.use(function(req, res, next) {
	console.log(req.method.grey, req.url.blue)
	next()
});

app.get('*', function(req, res) {
	var props = routes.resolve(req.url)

	if (!props.handler) return res.send(404)

	dispatcher.dispatch(props.handler).then(function(data) {

		res.render('layout', {
			app : React.renderComponentToString(Layout(data)),
			location : props,
			seed : data
		})

	}).catch(function(error) {
		res.send(500, error)
	})
})

app.listen(1337, function() {
	console.log('Server is listening on port %s', 1337)
})
