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
			var navElem = elem[0];
			var parentCtrl = elem.parent().controller();
			
			scope.isOpen = false;
			
			scope.openList = function() {
				scope.isOpen = !scope.isOpen;
			}
			
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
				// parentCtrl.addToMenuToggles(scope);
			} else {
				scope.isOpen = true;
			}
			
			DEBUG('scope.$parent:', elem.parent());
			// console.log(scope.title + ' is child of ' + scope.$parent.$parent.title);
			// DEBUG('parentCtrl:', parentCtrl.ctrlName);
				
		}
	}
});