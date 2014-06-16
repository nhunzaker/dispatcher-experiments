var Store = require('../lib/store')
var dispatcher = require('../dispatcher')

var OS = new Store('OS', '/data/os.json')

OS.parse = function(data) {
	return data.modules
};

dispatcher.register('OS_READ', OS, 'read')

module.exports = OS
