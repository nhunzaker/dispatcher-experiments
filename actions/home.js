var dispatcher = require('../dispatcher')
var HomeIndex  = require('../views/home/index.jsx')

module.exports = {

	index: function() {
		return dispatcher.dispatch('NOOP').then(function() {
			return {
				component : HomeIndex
			}
		})
	}

}
