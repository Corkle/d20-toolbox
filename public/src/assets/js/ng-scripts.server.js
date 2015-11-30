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
	
	this.menuToggles = function() {
		return menuToggles;
	}

	this.addToMenuToggles = function (menuToggle) {
		menuToggles.push(menuToggle);
	}

	this.ctrlName = $scope.title || '_BASE';

	this.openToggleList = function (menuToggle) {
		$scope.closeAllLists();
		menuToggle.isOpen = true;
	};

	$scope.closeAllLists = function () {
		if (menuToggles.length > 0) {
			for (var i = 0; i < menuToggles.length; i++) {
				menuToggles[i].isOpen = false;
			}
		}
	}
});
navMenuComponent.directive('navMenu', function () {
	return {
		require: '?^^navMenu',
		restrict: 'EA',
		transclude: true,
		scope: {
			title: '@'
		},
		controller: 'NavMenuCtrl',
		templateUrl: 'nav-menu/nav-menu/nav-menu.html',
		link: function (scope, elem, attrs, parentCtrl) {
			var isBase = !parentCtrl ? true : false;

			if (isBase) {
				scope.isOpen = true;
			} else {
				scope.isOpen = false;
				parentCtrl.addToMenuToggles(scope);

				scope.toggleList = function () {
					if (scope.isOpen) {
						scope.isOpen = false;
					} else {
						parentCtrl.openToggleList(scope);
					}
				}
				
				scope.$watch('isOpen', function(open) {	
					if (!open) {
						scope.closeAllLists();
					}
				})
			}
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
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("nav-menu/nav-menu/nav-menu.html","<li ng-show=\"title\" ng-class=\"{\'toggle-list-open\': isOpen && canToggle}\"><a class=\"md-button\" ng-class=\"{\'md-button-toggle\': canToggle}\" ng-click=\"toggleList()\"><div layout=\"row\" flex><span ng-bind=\"title\"></span> <span flex></span> <span ng-show=\"canToggle\"><md-icon md-svg-src=\"src/assets/img/icons/d20.svg\" class=\"md-toggle-icon\" ng-class=\"{\'toggled\': isOpen}\"></md-icon></span></div></a></li><ul ng-class=\"{\'menu-toggle-list\': canToggle, \'collapsed\': !isOpen}\"><div ng-transclude></div></ul>");
$templateCache.put("nav-menu/nav-menu/menu-link/menu-link.html","<li><a class=\"md-button md-ink-ripple\" ng-transclude></a></li>");}]);