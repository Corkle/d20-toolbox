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
var appComponents = angular.module('appComponents', ['ngMaterial', 'navMenu', 'appSvgIcons']);
appComponents.controller('SideNavCtrl', ['svgIcons', function(svgIcons) {
	this.svgIcons = svgIcons;
}]);

appComponents.controller('TopNavCtrl', ['svgIcons', '$mdSidenav', function(svgIcons, $mdSidenav) {
	this.svgIcons = svgIcons;
	this.openSidenav = function() {
		$mdSidenav('left-nav').open();
	}
}]);
angular.module('appSvgIcons', [])
	.service('svgIcons', function () {
		var iconsFolder = 'src/assets/img/icons/';

		return {
			account: iconsFolder + 'account.svg',
			apps: iconsFolder + 'apps.svg',
			chevronUp: iconsFolder + 'chevron-up.svg',
			d20: iconsFolder + 'd20.svg',			
			dotsVertical: iconsFolder + 'dots-vertical.svg',
			facebookBox: iconsFolder + 'facebook-box.svg',
			googlePlus: iconsFolder + 'google-plus-box.svg',
			mathCompass: iconsFolder + 'math-compass.svg',
			menu: iconsFolder + 'menu.svg',	
			menuUp: iconsFolder + 'menu-up.svg',
			sword: iconsFolder + 'sword.svg',
			twitter: iconsFolder + 'twitter.svg'
		}
	})
var navMenuComponent = angular.module('navMenu', ['appSvgIcons']);
var appServices = angular.module('appServices', []);

appServices.service('pageConfig', function() {
	var sideNavFolded = false;
	
	return {
		sidenavFolded: {
			get: function() { return sideNavFolded },
			set: function(newVal) {
				sideNavFolded = newVal;
			}
		}
	}
});
navMenuComponent.controller('NavMenuCtrl', ['$scope', '$element', '$attrs', 'svgIcons', function ($scope, $element, $attrs, svgIcons) {
	$scope.svgIcons = svgIcons;
	
	$scope.canToggle = false;
	if ($attrs.hasOwnProperty('toggleMenu')) {
		$scope.canToggle = true;
	}
	var menuToggles = [];

	this.addToMenuToggles = function (menuToggle) {
		menuToggles.push(menuToggle);
	}

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
}]);
navMenuComponent.directive('navMenu', function () {
	return {
		require: '?^^navMenu',
		restrict: 'EA',
		transclude: true,
		scope: {
			title: '@',
			labelIcon: '@'
		},
		controller: 'NavMenuCtrl',
		templateUrl: 'nav-menu/nav-menu/nav-menu.html',
		link: function (scope, elem, attrs, parentCtrl) {
			scope.isBase = !parentCtrl ? true : false;

			if (scope.isBase) {
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
		scope: {
			labelIcon: '@'
		},
		templateUrl: 'nav-menu/nav-menu/menu-link/menu-link.html'
	};
});
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("nav-menu/nav-menu/nav-menu.html","<li ng-show=\"title\" ng-class=\"{\'toggle-list-open\': isOpen && canToggle}\"><a class=\"layout-row md-button\" ng-class=\"{\'md-button-toggle\': canToggle}\" ng-click=\"toggleList()\" md-ink-ripple layout=\"row\"><md-icon ng-show=\"labelIcon\" md-svg-src=\"{{labelIcon}}\" class=\"nav-menu-label-icon\"></md-icon><span ng-bind=\"title\" flex></span> <span><div ng-if=\"canToggle\"><md-icon md-svg-src=\"{{svgIcons.chevronUp}}\" class=\"md-toggle-icon\" ng-class=\"{\'toggled\': isOpen}\"></md-icon></div><div ng-if=\"!canToggle\"><md-icon></md-icon></div></span></a></li><ul ng-class=\"{\'menu-toggle-list\': canToggle, \'collapsed\': !isOpen, \'hidden-folded\': !isBase}\"><div ng-transclude></div></ul>");
$templateCache.put("nav-menu/nav-menu/menu-link/menu-link.html","<li ng-class=\"{\'hidden-folded\': {{!labelIcon}}}\"><a class=\"md-button\" md-ink-ripple layout=\"row\"><md-icon ng-show=\"labelIcon\" md-svg-src=\"{{labelIcon}}\" class=\"nav-menu-label-icon\"></md-icon><span ng-transclude flex></span> <span><md-icon></md-icon></span></a></li>");}]);