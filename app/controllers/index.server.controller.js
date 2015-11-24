exports.render = function(req, res) {
	res.render('index', {
		text: "Text sent to index"
	})
}

exports.renderError = function(req, res) {
	console.log('renderError');
	res.render('error', {
		error: req.error
	})
}