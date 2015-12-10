function fileExists(file, cb) {
	var fs = require('fs');
	fs.stat(file, function (err, stats) {
		if (!err) {
			if (stats.isFile()) {
				return cb(true);
			}
		}
		return cb(false);
	})
}

exports.render = function (req, res) {
	var jsAssets = [];
	var jsScript = 'src/assets/js/ng-scripts.server.js';

	fileExists('public/' + jsScript, function (exists) {
		if (exists) {
			jsAssets.push(jsScript);
		}
		
		res.render('index', {
			sidenavFolded: false,
			jsFiles: jsAssets
		})
	});
}

exports.renderError = function (req, res) {
	console.log('renderError');
	res.render('error', {
		error: req.error
	})
}