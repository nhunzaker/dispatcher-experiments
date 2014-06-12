var Dispatcher = require('./dispatcher');
var Store = require('./store');

var dispatcher = new Dispatcher();

['url', 'path', 'os'].forEach(function(module) {
	var model   = new Store(module.toUpperCase(), 'http://nodejs.org/api/' + module + '.json')
	model.parse = function(data) { return data.modules; };

	dispatcher.register('LOAD', model, 'read');
}, {});

var server = require('http').createServer(function(req, res) {
	res.setHeader('Content-Type', 'text/html');

	dispatcher.dispatch('LOAD').then(function(data) {
		res.end(
			'<!DOCTYPE html><head><meta charset="utf8"/></head><body>' +
			'<p>Inspect the console for <code>__flux_cache</code></p>' +
			'<script>__flux_cache = ' + JSON.stringify(data) + ';</script></body></html>'
		);
	}).catch(function(err) {
		res.end(err);
	});
}).listen(1337, function() {
	console.log('Server is listening on port %s', 1337);
});
