var dispatcher = require('../dispatcher')
var URLIndex   = require('../views/url/index.jsx')

module.exports = {

	index: function() {
		return dispatcher.dispatch('URL_READ').then(function(data) {
			return {
				data      : data,
				component : URLIndex
			}
		})
	}

}
