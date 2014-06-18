var dispatcher = require('../dispatcher')
var OSIndex   = require('../views/os/index.jsx')

module.exports = {

	index: function() {
		return dispatcher.dispatch('OS_READ').then(function(data) {
			return {
				data      : data,
				component : OSIndex
			}
		})
	}

}
