/**
 * @name Router
 * @desc The router takes a given HTTP request and determines the
 *       appropriate action to take.
 */

var Router = require("./lib/router")

var router = new Router()

router.match(function(map) {
	map('/').to([ 'URL_READ', 'OS_READ', 'PATH_READ' ])

	map('os').to('OS_READ')

	map('path').to('PATH_READ')

	map('url').to('URL_READ')
})

module.exports = router
