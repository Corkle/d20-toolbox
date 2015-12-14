var express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	swig = require('swig');
	
swig.setDefaults({ varControls: ['<%=', '%>']});

module.exports = function() {
	var app = express();
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	
	app.use(bodyParser.json());
	
	app.engine('html', swig.renderFile);
	app.set('views', './app/views');
	app.set('view engine', 'html');
	
	app.use(passport.initialize());
	app.use(passport.session());
	
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	
	app.use(express.static('./public'));
	
	return app;
}