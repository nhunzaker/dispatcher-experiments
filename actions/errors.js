var dispatcher = require('../dispatcher')

module.exports = {

	error404: function() {
		return {
			data      : {},
			component : require('../views/errors/404.jsx')
		}
	},

	error500: function(error) {
		console.error(error)

		return {

			data      : {},
			component : require('../views/errors/500.jsx')
		}
	}
}
