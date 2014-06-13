var dispatcher = require('../dispatcher');

module.exports = {
	index: function() {
		return dispatcher.dispatch('URL_READ');
	}
};
