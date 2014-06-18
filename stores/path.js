var Store = require('../lib/store')
var dispatcher = require('../dispatcher')

var Path = new Store({
	id: 'PATH',
	url: '/data/path.json'
})

Path.parse = function(data) {
	return data.modules
}

dispatcher.register('PATH_READ', Path, 'read')

module.exports = Path
