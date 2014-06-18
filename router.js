var Router = require("./lib/router")

module.exports = Router({
	''     : require('./actions/home').index,
	'os'   : require('./actions/os').index,
	'path' : require('./actions/path').index,
	'url'  : require('./actions/url').index,
	'404'  : require('./actions/errors').error404,
	'500'  : require('./actions/errors').error500
})
