var url = require('url')

var Store = function(options) {
	this.initialize(options)
}

Store.ajax = require('./ajax')
Store.sync = require('./sync')

Store.prototype = {

	initialize: function (options) {
		this.id   = options.id
		this._url = options.url

		this._setupCache()
	},

	_setupCache: function() {
		__flux_cache = typeof __flux_cache === 'undefined' ? {} : __flux_cache
		this._data = __flux_cache[this.id] = __flux_cache[this.id] || []
	},

	toURL: function(id) {
		return typeof id !== 'undefined' ? url.resolve(this._url, id) : this._url
	},

	parse: function(data) {
		return data
	},

	sync: function(method, entity, options) {
		return Store.sync.apply(this, arguments)
	},

	all: function() {
		return this._data
	},

	get: function(id) {
		for (var i = 0, len = this._data.length; i < len; i++) {
			if (id === this._data[i]) return this._data[i]
		}
		return null
	},

	add: function(props) {
		this._data.push(props)
	},

	indexOf: function(id) {
		return this._data.indexOf(this.get(id))
	},

	set: function(id, props) {
		var record = this.get(id)

		if (record) {
			Object.keys(props).forEach(function(key) {
				record[key] = props[key]
			})

		}
	},

	remove: function(id) {
		var index = this.indexOf(id)

		if (index >= 0) {
			this._data.splice(index, 1)
		}
	},

	reset: function(data) {
		this._data.length = 0
		this._data.splice.apply(this._data, [0, 0].concat(data))
	},

	create: function(props) {
		this.add(props)

		return this.sync('create', this, { data: props }).then(function(response) {
			return this.parse(response.body)
		}.bind(this))
	},

	read: function(id) {
		var store = this

		return this.sync('read', store, { url: this.toURL(id) }).then(function(response) {
			var parsed = store.parse(response.body)

			store.reset(parsed)

			return parsed
		})
	},

	update: function(id, props) {
		var store = this
		var options = {
			data : props,
			url  : this.toURL(id)
		}

		this.set(id, props)

		return this.sync('update', store, options).then(function(response) {
			return store.parse(response)
		}).then(function(parsed) {
			store.set(parsed.id, parsed)
			return parsed
		})
	},

	destroy: function(id) {
		var options = {
			url: this.toURL(id)
		}

		this.delete(id)

		return this.sync('destroy', this, options)
	}
}

module.exports = Store
