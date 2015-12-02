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