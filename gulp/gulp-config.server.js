module.exports = {
	server: 'server.js',
	htmlViews: ['app/views/**/*.html', 'app/components/**/*.html', '!app/components/shared/**/*'],
	cssFiles: ['public/src/assets/css/*.css'],
	jsServerFiles: ['app/**/*.js', '!app/components/**/*.js', 'config/**/*.js'],
	jsClientFiles: ['app/application.js', 'app/components/**/*.js'],
	htmlPartials: ['app/components/shared/**/*.html'],
	ngScript: {
		path: 'public/src/assets/js/',
		file: 'ng-scripts.server.js'
	},
	libs: ['public/src/assets/libs/']
};