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