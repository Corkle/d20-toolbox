var appName = 'toolboxApp';
var app = angular.module(appName, ['ngMaterial', 'ui.router','appComponents', 'templates', 'appSvgIcons', 'appServices']);

app.config(['$locationProvider', function($locationProvider) {

	$locationProvider
		.html5Mode(true)
		.hashPrefix('!');
}]);

app.controller('AppCtrl',['pageConfig', function(pageConfig) {
	this.sidenavFolded = pageConfig.sidenavFolded.get();
}]);

function DEBUG(msg, obj) {
    var dt = new Date();
    var timestamp = dt.toLocaleTimeString();
    console.log(timestamp, msg, obj);
}