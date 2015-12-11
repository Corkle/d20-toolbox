appComponents.controller('TopNavCtrl', ['svgIcons', '$mdSidenav', function(svgIcons, $mdSidenav) {
	this.svgIcons = svgIcons;
	this.openSidenav = function() {
		$mdSidenav('left-nav').open();
	}
}]);