module.exports = {
	assetsFolder: 'public/src/assets/',
	cssFiles: ['public/src/assets/libs/angular-material/angular-material.css',
		'public/src/assets/css/*.css'],
	dist: {
		folder: 'public/dist/',
		libsFile: 'libs.js',
		stylesFile: 'main.css',
		jsFile: 'main.js'
	},
	htmlPartials: ['app/components/shared/**/*.html'],
	htmlViews: ['app/views/**/*.html', 'app/components/**/*.html', '!app/components/shared/**/*'],
	jsClientFiles: ['app/application.js', 'app/components/**/*.js'],
	jsServerFiles: ['app/**/*.js', '!app/components/**/*.js', 'config/**/*.js'],
	libs: ['public/src/assets/libs/angular/angular.js',
		'public/src/assets/libs/angular-ui-router/release/angular-ui-router.js',
		'public/src/assets/libs/angular-aria/angular-aria.js',
		'public/src/assets/libs/angular-animate/angular-animate.js',
		'public/src/assets/libs/angular-material/angular-material.js',
		],
	ngScript: {
		path: 'public/src/assets/js/',
		file: 'ng-scripts.js'
	},
	sassFiles: ['public/src/assets/sass/**/*.scss'],
	server: 'server.js'	
};