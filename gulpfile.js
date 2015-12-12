var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*', 'del', 'add-stream'],
		replaceString: /\bgulp[\-.]/
	}),
	spawn = require('child_process').spawn,
	env = Object.create(process.env),
	browser = require('browser-sync'),
	paths = require('./gulp/gulp-config.server');

var node;
env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = require('./config/env/' + env.NODE_ENV).port;

/*********************************************
* TASK: gulp
* Starts server for dev environment
*********************************************/
gulp.task('default', ['browser:start', 'watch:app']);

/*********************************************
* TASK: server:start
* Launches the server
*********************************************/
gulp.task('server:start', function () {
	if (node) node.kill();
	node = spawn('node', [paths.server], { stdio: 'inherit', env: env });
});

/*********************************************
* TASK: browser-sync
* Launches browser, reloads browser when reload function is called
*********************************************/
gulp.task('browser:start', ['server:start'], function () {
	browser({
		proxy: 'localhost:' + port,
		port: 5000,
		notify: false
	})
})

/*********************************************
* TASK: compass
* Compile Sass to CSS using Compass
*********************************************/
gulp.task('compass', function () {
	gulp.src(paths.sassFiles)
		.pipe(plugins.plumber())
		.pipe(plugins.compass({
			css: paths.assetsFolder + 'css/',
			sass: paths.assetsFolder + 'sass/',
			image: paths.assetsFolder + 'img/'
		}))
		.pipe(plugins.plumber.stop());
});

/*********************************************
* TASK: join:partials
* Concatenate all AngularJS files, HTML partials to $templateCache
*********************************************/
gulp.task('join:partials', ['clean:scripts'], function () {
	if (env.NODE_ENV !== 'production') {
		return gulp.src(paths.jsClientFiles)
			.pipe(plugins.addStream.obj(partialsToTemplates(paths.htmlPartials)))
			.pipe(plugins.concat(paths.ngScript.file))
			.pipe(gulp.dest(paths.ngScript.path));
	}
});

/*********************************************
* TASK: clean:scripts
* Clean existing ng-scripts file
*********************************************/
gulp.task('clean:scripts', function (cb) {
	if (env.NODE_ENV !== 'production') {
		plugins.del([
			paths.ngScript.path + paths.ngScript.file,
		])
		cb();
	}
});

/*********************************************
* TASK: watch:app
* Watches for changes in files and sets tasks.
*********************************************/
gulp.task('watch:app', ['join:partials'], function () {
	if (env.NODE_ENV !== 'production') {
		gulp.watch(paths.jsClientFiles, ['join:partials']);
		gulp.watch(paths.htmlPartials, ['join:partials']);
		gulp.watch(paths.sassFiles, ['compass']);
		gulp.watch(paths.ngScript.path + paths.ngScript.file, ['browser:reload']);
		gulp.watch(paths.jsServerFiles, ['browser:reload']);
		gulp.watch(paths.htmlViews, ['browser:reload']);
		gulp.watch(paths.cssFiles, ['browser:reload']);
	}
});

/*********************************************
* TASK: browser:reload
* Starts new server instance and reloads browser.
*********************************************/
gulp.task('browser:reload', ['server:start'], function () {
	browser.reload();
})

/*********************************************
* Return stream of 'templates' module. 'templates' loads HTML partials to $templateCache
*********************************************/
function partialsToTemplates(htmlPartials) {
	return gulp.src(htmlPartials)
		.pipe(plugins.htmlmin({ collapseWhitespace: true, removeComments: true }))
		.pipe(plugins.angularTemplatecache({ standalone: true }));
}

/*********************************************
* TASK: build
* 
*********************************************/
gulp.task('build', ['build:js', 'build:libs', 'build:css'], function () {
	
})

/*********************************************
* TASK: build:js
* Minify js scripts to dist folder
*********************************************/
gulp.task('build:js', function () {
	return gulp.src(paths.ngScript.path + paths.ngScript.file)
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.dist.folder));
})

/*********************************************
* TASK: build:libs
* Minify vendor libs to dist folder
*********************************************/
gulp.task('build:libs', function () {
	return gulp.src(paths.libs)
		.pipe(plugins.concat('libs.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.dist.folder));
})

/*********************************************
* TASK: build:css
* Minify all css to dist folder
*********************************************/
gulp.task('build:css', function () {
	return gulp.src(paths.cssFiles)
	.pipe(plugins.concat('main.css'))
	.pipe(plugins.autoprefixer('last 2 versions'))
	.pipe(plugins.minifyCss({keepSpecialComments: 0}))
	.pipe(gulp.dest(paths.dist.folder));
})

/*********************************************
* TASK: clean:dist
* Clean current dist folder
*********************************************/
gulp.task('clean:dist', function () {
	plugins.del([
		paths.dist.folder
	])
})

// /*********************************************
// * TASK: 
// * 
// *********************************************/
// gulp.task('', [''], function () {
	
// })
