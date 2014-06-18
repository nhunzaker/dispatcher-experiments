var dispatcher = require('../dispatcher')
var PathIndex  = require('../views/path/index.jsx')

module.exports = {

	index: function() {
		return dispatcher.dispatch('PATH_READ').then(function(data) {
			return {
				data      : data,
				component : PathIndex
			}
		})
	}

}
