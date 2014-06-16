var Store = require('../lib/store')
var dispatcher = require('../dispatcher')

var URL = new Store('URL', '/data/url.json')

URL.parse = function(data) {
	return data.modules
};

dispatcher.register('URL_READ', URL, 'read')

module.exports = URL
