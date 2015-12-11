process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	express = require('./config/express');
	
var app = express()
var port = process.env.PORT || config.port;

app.listen(port);

module.exports = app;

console.log('Server running at http://localhost:' + port);