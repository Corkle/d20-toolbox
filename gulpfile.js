var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	}),
	browser = require('browser-sync'),
	paths = require('./gulp/gulp-config.server'),
	devPort = require('./config/env/development').port;
	
gulp.task('default', ['browser-sync']);

gulp.task('nodemon', function() {
	var started = false;
	
	return plugins.nodemon({
		script: 'server.js',
		ext: 'js html',
		env: { 'NODE_ENV' : 'development' }
	})
		.on('start', function() {
			if (!started) {
				started = true;
			}
		})
		.on('restart', function() {
			setTimeout(function() {
				browser.reload({stream: false})
			}, 500)
		});
});

gulp.task('browser-sync', ['nodemon'], function() {
	browser({
		proxy: 'localhost:' + devPort,
		port: 5000,
		notify: false
	})
})