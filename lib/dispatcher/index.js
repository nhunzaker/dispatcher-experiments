var RSVP = require('rsvp');

var Dispatcher = function() {
	this._callbacks = [];
};

Dispatcher.prototype = {
	register: function (type, entity, method) {
		var options = {
			id       : entity.id,
			callback : entity[method].bind(entity),
			type     : type
		};

		if (!options.id) {
			throw new TypeError("Entities must have a unique ID.");
		}

		this._callbacks.push(options);

		return this._callbacks.length - 1;
	},

	includesType: function(type, nextType) {
		if (Array.isArray(type)) {
			return type.indexOf(nextType) > -1;
		} else {
			return type === nextType;
		}
	},

	dispatch: function(type, payload) {
		var _promises = this._callbacks.reduce(function(memo, next) {
			if (this.includesType(type, next.type)) {
				memo[next.id] = next.callback(payload);
			}

			return memo;
		}.bind(this), {});

		return RSVP.hash(_promises);
	}
};

module.exports = Dispatcher;
