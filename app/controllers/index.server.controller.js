// function fileExists(file, cb) {
// 	var fs = require('fs');
// 	fs.stat(file, function (err, stats) {
// 		if (!err) {
// 			if (stats.isFile()) {
// 				return cb(true);
// 			}
// 		}
// 		console.log('Could not find file:', file);
// 		return cb(false);
// 	})
// }

// function fileChecker(files, path, cb) {
// 	var uncheckedFiles = files.slice(0);
// 	var verifiedFiles = [];

// 	(function checkInOrder() {
// 		var file = uncheckedFiles.splice(0, 1)[0];

// 		fileExists(path + file, function (exists) {
// 			if (exists) {
// 				verifiedFiles.push(file);
// 			}

// 			if (uncheckedFiles.length == 0) {
// 				cb(verifiedFiles);
// 			} else {
// 				setTimeout(checkInOrder, 0);
// 			}
// 		})
// 	} ());
// }

// function verifyAssets(assets, path, cb) {
// 	var js,
// 		css,
// 		libs;

// 	function checkComplete(cb) {
// 		if (js && css && libs) {
// 			cb({
// 					js: js,
// 					css: css,
// 					libs: libs
// 				});				
// 		}
// 	}

// 	fileChecker(assets.js, path, function (files) {
// 		if (files) {
// 			js = files;
// 		} else {
// 			js = [];
// 		}
// 		checkComplete(cb);
// 	});
// 	fileChecker(assets.css, path, function (files) {
// 		if (files) {
// 			css = files;
// 		} else {
// 			css = [];
// 		}
// 		checkComplete(cb);
// 	});
// 	fileChecker(assets.libs, path, function (files) {
// 		if (files) {
// 			libs = files;
// 		} else {
// 			libs = [];
// 		}
// 		checkComplete(cb);
// 	});
// }

var config = require('../../config/config.js');
// var assetFiles = {
// 	js: config.assets.js,
// 	css: config.assets.css,
// 	libs: config.assets.libs
// };

exports.render = function (req, res) {
	// verifyAssets(assetFiles, 'public/', function (assets) {
		res.render('index', {
			title: 'Dashboard',
			sidenavFolded: true,
			jsFiles: config.assets.js,
			cssFiles: config.assets.css,
			libFiles: config.assets.libs,
			user: req.user ? req.user.username : ''
		});
	// });
};

exports.renderError = function (req, res) {
	res.render('error', {
		title: 'Error - D20 Toolbox',
		sidenavFolded: false,
		jsFiles: config.assets.js,
		cssFiles: config.assets.css,
		libFiles: config.assets.libs,
		error: req.error
	});
};