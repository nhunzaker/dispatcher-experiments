var Store = require('../lib/store');
var Path = new Store('PATH', 'http://nodejs.org/api/path.json');

var dispatcher = require('../dispatcher');

Path.parse = function(data) {
	return data.modules;
};

dispatcher.register('PATH_READ', Path, 'read');

module.exports = Path;
