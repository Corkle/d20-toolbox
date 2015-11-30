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