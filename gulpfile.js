var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*', 'del'],
		replaceString: /\bgulp[\-.]/
	}),
	spawn = require('child_process').spawn,
	browser = require('browser-sync'),
	paths = require('./gulp/gulp-config.server'),
	port = require('./config/env/development').port;
	
var node;

/*********************************************
* TASK: gulp
* Starts server for dev environment
*********************************************/
gulp.task('default', ['browser:start', 'watch:app']);

/*********************************************
* TASK: server:start
* Launches the server
*********************************************/
gulp.task('server:start', function() {
	if (node) node.kill();
	node = spawn('node', [paths.server], {stdio: 'inherit'});
});

/*********************************************
* TASK: browser-sync
* Launches browser, reloads browser when reload function is called
*********************************************/
gulp.task('browser:start', ['server:start'], function() {
	browser({
		proxy: 'localhost:' + port,
		port: 5000,
		notify: false
	})
})

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
gulp.task('clean:scripts', function (cb) {
	plugins.del([
		paths.ngScript.path + paths.ngScript.file,
	])
	cb();
});

/*********************************************
* TASK: watch:app
* Watches for changes in files and sets tasks.
*********************************************/
gulp.task('watch:app', function() {
	gulp.watch(paths.jsPartials, ['join:partials']);
	gulp.watch(paths.ngScript.path+paths.ngScript.file, ['browser:reload']);
	gulp.watch(paths.jsServerFiles, ['browser:reload']);
	gulp.watch(paths.htmlFiles, ['browser:reload']);
	gulp.watch(paths.cssFiles, ['browser:reload']);
});

/*********************************************
* TASK: browser:reload
* Starts new server instance and reloads browser.
*********************************************/
gulp.task('browser:reload', ['server:start'],function() {
	browser.reload();
})