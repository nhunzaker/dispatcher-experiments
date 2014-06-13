var Router      = require("./lib/router");
var router      = new Router();

var Home = require('./actions/home');
var Path = require('./actions/path');
var URL  = require('./actions/url');
var OS   = require('./actions/os');

router.match(function(map) {
	map('').to(Home.index);
	map('os').to(OS.index);
	map('path').to(Path.index);
	map('url').to(URL.index);
});

module.exports = router;
