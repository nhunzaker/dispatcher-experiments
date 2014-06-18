var dispatcher = require('../dispatcher')

module.exports = {

	push: function(url) {
		window.history.pushState(null, null, url)
		return dispatcher.dispatch('URL_UPDATE', url)
	},

	replace: function(url) {
		window.history.replaceState(null, null, url)
		return dispatcher.dispatch('URL_UPDATE', url)
	}

}
