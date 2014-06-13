var dispatcher = require('../dispatcher');

module.exports = {
	index: function() {
		return dispatcher.dispatch(['URL_READ', 'OS_READ', 'PATH_READ']);
	}
};
