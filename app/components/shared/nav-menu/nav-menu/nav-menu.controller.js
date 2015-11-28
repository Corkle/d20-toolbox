navMenuComponent.controller('NavMenuCtrl', function ($scope, $element, $attrs) {
	$scope.canToggle = false;
	if ($attrs.hasOwnProperty('toggleMenu')) {
		$scope.canToggle = true;
	}
	var menuToggles = [];

	this.openToggleList = function (menuToggle) {
		for (var i = 0; i < menuToggles.length; i++) {
			menuToggle.isOpen = false;
		}
		menuToggle.isOpen = true;
	};

	this.addToMenuToggles = function (menuToggle) {
		menuToggles.push(menuToggle);
	}
});