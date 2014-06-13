var dispatcher = require('../dispatcher');

module.exports = {
	index: function() {
		return dispatcher.dispatch('OS_READ');
	}
};
