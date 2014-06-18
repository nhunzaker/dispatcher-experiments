var RSVP = require('rsvp')

var Dispatcher = function() {
	this._callbacks = []
}

Dispatcher.prototype = {
	register: function (type, entity, method) {
		if (!entity.id) {
			throw new TypeError("Entities must have a unique ID.")
		}

		this._callbacks.push({
			id       : entity.id,
			callback : entity[method].bind(entity),
			type     : type
		})

		return this._callbacks.length - 1
	},

	dispatch: function(type, payload) {
		var _promises = {}

		this._callbacks.forEach(function(next) {
			if (type.indexOf(next.type) > -1) {
				_promises[next.id] = next.callback(payload)
			}
		})

		return RSVP.hash(_promises)
	}
}

module.exports = Dispatcher
