var Router = require("./lib/router")
var router = new Router()

router.match({
	''     : require('./actions/home').index,
	'os'   : require('./actions/os').index,
	'path' : require('./actions/path').index,
	'url'  : require('./actions/url').index
})

module.exports = router
