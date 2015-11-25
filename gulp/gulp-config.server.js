module.exports = {
	server: 'server.js',
	app: 'public/src/applicaiton.js',
	htmlFiles: ['app/**/*.html'],
	cssFiles: ['public/src/assets/css/*.css'],
	jsFiles: ['public/src/application.js', 'app/**/*.js', 'config/**/*.js'],
	jsPartials: ['app/components/**/*.js'],
	htmlPartials: ['app/components/**/*.html'],
	ngScript: {
		path: 'public/src/assets/js/',
		file: 'ng-scripts.server.js'
	},
	libs: ['public/src/assets/libs/']
};