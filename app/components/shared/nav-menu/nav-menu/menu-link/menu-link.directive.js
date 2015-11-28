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