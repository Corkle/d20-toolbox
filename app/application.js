var appName = 'toolboxApp';
var app = angular.module(appName, ['ngMaterial', 'ui.router','toolboxApp.components', 'templates', 'appSvgIcons']);

app.config(['$locationProvider', function($locationProvider) {

	$locationProvider
		.html5Mode(true)
		.hashPrefix('!');
}]);

// app.controller('appCtrl', function(svgIcons) {
// 	this.svgIcons = svgIcons;	
// });

function DEBUG(msg, obj) {
    var dt = new Date();
    var timestamp = dt.toLocaleTimeString();
    console.log(timestamp, msg, obj);
}