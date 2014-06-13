var url  = require('url');
var path = require('path');

var Store = function(id, url) {
	Store.prototype.initialize.apply(this, arguments);
};

Store.ajax = require('./ajax');
Store.sync = require('./sync');

Store.prototype = {
	initialize: function (id, url) {
		this.id = id;
		this.url = url ? url : this.url;
		this.__cache = [];
	},

	length: function() {
		return this.__cache.length;
	},

	parse: function(data) {
		return data;
	},

	create: function(data) {
		var store = this;
		return Store.sync('create', store, { data: data }).then(function(data) {
			store.__cache = store.parse(data);
			return store.__cache;
		});
	},

	read: function() {
		var store = this;
		return Store.sync('read', store).then(function(data) {
			store.__cache = store.parse(data);
			return store.__cache;
		});
	},

	update: function(id, props) {
		return Store.sync('update', store, {
			data : data,
			url  : url.resolve(this.url, id)
		}).then(function(data) {
			store.__cache = store.parse(data);
			return store.__cache;
		});
	},

	destroy: function(id) {
		return Store.sync('destroy', store, {
			url : url.resolve(this.url, id)
		});
	}
};

module.exports = Store;
