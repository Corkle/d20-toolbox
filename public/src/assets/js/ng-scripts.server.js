var appName = 'toolboxApp';
var app = angular.module(appName, ['ngMaterial', 'ui.router','toolboxApp.components', 'templates']);

app.config(['$locationProvider', function($locationProvider) {

	$locationProvider
		.html5Mode(true)
		.hashPrefix('!');
}]);
var appComponents = angular.module('toolboxApp.components', ['navMenu']);
appComponents.controller('SidenavCtrl', function() {
  var originEv;
  this.openMenu = function($mdOpenMenu, ev) {
    originEv = ev;
    $mdOpenMenu(ev);
    
  };
});

appComponents.controller('NavCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
  this.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
}])
var navMenuComponent = angular.module('navMenu', []);
navMenuComponent.controller('NavMenuCtrl', function ($scope, $element, $attrs) {
	$scope.canToggle = false;
	if ($attrs.hasOwnProperty('toggleMenu')) {
		$scope.canToggle = true;
	}
	var menuToggles = [];

	this.openToggleList = function (menuToggle) {
		for (var i = 0; i < menuToggles.length; i++) {
			menuToggle.isOpen = false;
		}
		menuToggle.isOpen = true;
	};

	this.addToMenuToggles = function (menuToggle) {
		menuToggles.push(menuToggle);
	}
});
navMenuComponent.directive('navMenu', function () {
	return {
		restrict: 'EA',
		transclude: true,
		scope: {
			title: '@'
		},
		controller: 'NavMenuCtrl',
		templateUrl: 'nav-menu/nav-menu/nav-menu.html',
		link: function (scope, elem, attrs) {
			
		}
	}
});
appComponents.directive('menuLink', function() {
	return {
		require: '^navMenu',
		restrict: 'E',
		transclude: true,
		templateUrl: 'nav-menu/nav-menu/menu-link/menu-link.html'
	};
});
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("nav-menu/nav-menu/nav-menu.html","<md-button ng-show=\"title\" ng-class=\"{\'md-button-toggle\': canToggle}\"><div layout=\"row\" flex><span ng-bind=\"title\"></span> <span flex></span> <span ng-show=\"canToggle\"><md-icon md-svg-src=\"src/assets/img/icons/d20.svg\"></md-icon></span></div></md-button><ul ng-class=\"{\'menu-toggle-list\': canToggle}\"><div class=\"\" ng-transclude></div></ul>");
$templateCache.put("nav-menu/nav-menu/menu-link/menu-link.html","<li><a class=\"md-button md-ink-ripple\" ng-transclude></a></li>");}]);