process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');
	
var db = mongoose(),
	app = express(),
	passport = passport(),
	port = process.env.PORT || config.port;

app.listen(port);

module.exports = app;

console.log('Server running at http://localhost:' + port + '. ENV: ' + process.env.NODE_ENV);