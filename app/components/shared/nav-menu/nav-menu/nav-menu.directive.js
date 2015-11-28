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