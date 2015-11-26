var express = require('express'),
	swig = require('swig');
	
swig.setDefaults({ varControls: ['<%=', '%>']});

module.exports = function() {
	var app = express();
	
	app.engine('html', swig.renderFile);
	app.set('views', './app/views');
	app.set('view engine', 'html');
	
	require('../app/routes/index.server.routes.js')(app);
	
	app.use(express.static('./public'));
	
	return app;
}