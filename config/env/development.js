var port = 8000;

var assets = {
	css: [
		"src/assets/libs/angular-material/angular-material.css",
		"src/assets/css/style.css"
	],
	js: [	
		"src/assets/js/ng-scripts.js"
	],
	libs: [
		"src/assets/libs/angular/angular.js",
		"src/assets/libs/angular-ui-router/release/angular-ui-router.js",
		"src/assets/libs/angular-aria/angular-aria.js",
		"src/assets/libs/angular-animate/angular-animate.js",
		"src/assets/libs/angular-material/angular-material.js",
	]
};

module.exports = {
	port: port,
	assets: assets
}