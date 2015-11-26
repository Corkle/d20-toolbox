module.exports = {
	server: 'server.js',
	app: 'public/src/application.js',
	htmlFiles: ['app/**/*.html'],
	cssFiles: ['public/src/assets/css/*.css'],
	jsServerFiles: ['public/src/application.js', 'app/**/*.js', '!app/components/**/*.js', 'config/**/*.js'],
	jsPartials: ['app/components/**/*.js'],
	htmlPartials: ['app/components/**/*.html'],
	ngScript: {
		path: 'public/src/assets/js/',
		file: 'ng-scripts.server.js'
	},
	libs: ['public/src/assets/libs/']
};