var dispatcher = require('../dispatcher')
var router     = require('../router')

module.exports = {

	request: function(url) {
		var action  = router.resolve(url)
		var handler = action.handler ? action.handler : this.error404

		return handler(action ? action.params : null).catch(this.error500)
	},

	error404: function() {
		return dispatcher.dispatch('NOOP').then(function() {
			return {
				data      : {},
				component : require('../views/errors/404.jsx')
			}
		})
	},

	error500: function(error) {
		console.error(error)

		return dispatcher.dispatch('NOOP').then(function() {
			return {
				data      : {},
				component : require('../views/errors/500.jsx')
			}
		})
	}
}
