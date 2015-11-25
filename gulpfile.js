var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*', 'del'],
		replaceString: /\bgulp[\-.]/
	}),
	browser = require('browser-sync'),
	paths = require('./gulp/gulp-config.server'),
	devPort = require('./config/env/development').port;

/*********************************************
* TASK: gulp
* Starts server for dev environment
*********************************************/
gulp.task('default', ['browser-sync']);

/*********************************************
* TASK: browser-sync
* Launches browser, reloads browser when reload function is called
*********************************************/
gulp.task('browser-sync', ['nodemon'], function() {
	browser({
		proxy: 'localhost:' + devPort,
		port: 5000,
		notify: false
	})
})

/*********************************************
* TASK: nodemon
* Starts node server and sets watches, restarts server on change
*********************************************/
gulp.task('nodemon', function() {
	var started = false;
	
	return plugins.nodemon({
		script: paths.server,
		ext: 'js html css',
		watch: [paths.jsFiles, paths.htmlFiles, paths.cssFiles],
		ignore: [paths.libs],
		env: { 'NODE_ENV' : 'development' }
	})
		.on('start', ['watch-app'])
		.on('change', ['watch-app'])
		.on('restart', function() {
			setTimeout(function() {
				browser.reload({stream: false})
			}, 500)
		});
});

/*********************************************
* TASK: bundle-scripts
* Concatenate all AngularJS files, HTML partials to $templateCache
*********************************************/
gulp.task('join:partials', ['clean:scripts'], function() {
	return gulp.src(paths.jsPartials)
		.pipe(plugins.concat(paths.ngScript.file))
		.pipe(gulp.dest(paths.ngScript.path));
});

/*********************************************
* TASK: clean:scripts
* Clean existing ng-scripts file
*********************************************/
gulp.task('clean:scripts', function () {

	return plugins.del([
		paths.ngScript.path + paths.ngScript.file,
	])
});

gulp.task('watch-app', function() {
	gulp.watch(paths.jsPartials, ['join:partials']);
});

// https://gist.github.com/webdesserts/5632955