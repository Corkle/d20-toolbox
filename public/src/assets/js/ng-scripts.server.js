var appName = 'toolboxApp';
var app = angular.module(appName, ['ngMaterial', 'ui.router','toolboxApp.components', 'templates']);

app.config(['$locationProvider', function($locationProvider) {

	$locationProvider
		.html5Mode(true)
		.hashPrefix('!');
}]);

function DEBUG(msg, obj) {
    var dt = new Date();
    var timestamp = dt.toLocaleTimeString();
    console.log(timestamp, msg, obj);
}
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
	
	this.ctrlName = $scope.title;
	this.menuToggles = menuToggles;

	this.openToggleList = function (menuToggle) {
		for (var i = 0; i < menuToggles.length; i++) {
			menuToggle.isOpen = false;
		}
		menuToggle.isOpen = true;
	};

	this.addToMenuToggles = function (menuToggle) {
		menuToggles.push(menuToggle);
		// DEBUG('addToMenuToggle:', menuToggles[0]);
	}
	
	$scope.$watch('menuToggles', function(newVal, oldVal) {
		// DEBUG('Scope Watch:', $scope.title);
	}, true)
});
navMenuComponent.directive('navMenu', function () {
	return {
		restrict: 'EA',
		require: '^navMenu',
		transclude: true,
		scope: {
			title: '@'
		},
		controller: 'NavMenuCtrl',
		templateUrl: 'nav-menu/nav-menu/nav-menu.html',
		link: function (scope, elem, attrs, parentCtrl) {
			var navElem = elem[0];
			
			function hasClass(element, className) {
				var foundClass = false;
				for (var i = 0; i < element.classList.length; i++) {
					if (element.classList[i] === className) {
						foundClass = true;
						break;
					}
				}
				return foundClass;
			}
			
			if (!hasClass(navElem, 'nav-menu-bar')) {
				parentCtrl.addToMenuToggles(scope);
			}
			
			// DEBUG('scope.$parent:', scope.$parent.$parent.title);
			console.log(scope.title + ' is child of ' + scope.$parent.$parent.title);
			// DEBUG('parentCtrl:', parentCtrl.ctrlName);
				
		}
	}
});
appComponents.directive('menuLink', function() {
	return {
		require: '^navMenu',
		restrict: 'E',
		transclude: true,
		templateUrl: 'nav-menu/nav-menu/menu-link/menu-link.html',
				link: function (scope, elem, attrs, parentCtrl) {
			
			// console.log(scope.title + ' is child of ' + parentCtrl.ctrlName);
				
		}
	};
});
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("nav-menu/nav-menu/nav-menu.html","<li ng-show=\"title\"><a class=\"md-button\" ng-class=\"{\'md-button-toggle\': canToggle}\" ng-click=\"toggle()\"><div layout=\"row\" flex><span ng-bind=\"title\"></span> <span flex></span> <span ng-show=\"canToggle\"><md-icon md-svg-src=\"src/assets/img/icons/d20.svg\"></md-icon></span></div></a></li><ul ng-class=\"{\'menu-toggle-list\': canToggle}\"><div class=\"\" ng-transclude></div></ul>");
$templateCache.put("nav-menu/nav-menu/menu-link/menu-link.html","<li><a class=\"md-button md-ink-ripple\" ng-transclude></a></li>");}]);