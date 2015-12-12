function fileExists(file, cb) {
	var fs = require('fs');
	fs.stat(file, function (err, stats) {
		if (!err) {
			if (stats.isFile()) {
				return cb(true);
			}
		}
		console.log('Could not find file:', file);
		return cb(false);
	})
}

function fileChecker(files, location, cb) {
	var uncheckedFiles = files.slice(0);
	var verifiedFiles = [];

		(function checkInOrder() {
			var file = uncheckedFiles.splice(0,1)[0];
			
			fileExists(location + file, function (exists) {
				if (exists) {
					verifiedFiles.push(file);
				}

				if (uncheckedFiles.length == 0) {
					cb(verifiedFiles);
				} else {
					setTimeout(checkInOrder, 0);
				}
			})
		} ());
}

var config = require('../../config/config.js');

exports.render = function (req, res) {
	var jsAssets = config.assets.js;
	var cssAssets = config.assets.css;

	fileChecker(jsAssets, 'public/', function (jsFiles) {
		res.render('index', {
			sidenavFolded: true,
			jsFiles: jsFiles,
			cssFiles: cssAssets
		})
	});
}

exports.renderError = function (req, res) {
	console.log('renderError');
	res.render('error', {
		error: req.error
	})
}