var appName = 'toolboxApp';
var app = angular.module(appName, ['ngMaterial', 'ui.router']);

app.config(['$locationProvider', function($locationProvider) {

	$locationProvider
		.html5Mode(true)
		.hashPrefix('!');
}]);