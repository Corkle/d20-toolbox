var fs = require('fs');

exports.render = function (req, res) {
	var jsAssets = ['src/application.js'];
	var jsScript = 'src/assets/js/ng-scripts.server.js';
	fs.stat('public/' + jsScript, function (err, stats) {
		if (!err) {
			if (stats.isFile()) {
				jsAssets.push(jsScript);
			}
		}

		res.render('index', {
			text: "Text sent to index",
			jsFiles: jsAssets
		})
	})
}

exports.renderError = function (req, res) {
	console.log('renderError');
	res.render('error', {
		error: req.error
	})
}