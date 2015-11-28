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