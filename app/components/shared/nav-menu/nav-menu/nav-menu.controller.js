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