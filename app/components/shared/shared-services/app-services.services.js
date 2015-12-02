var appServices = angular.module('appServices', []);

appServices.service('pageConfig', function() {
	var sideNavFolded = false;
	
	return {
		sidenavFolded: {
			get: function() { return sideNavFolded },
			set: function(newVal) {
				sideNavFolded = newVal;
			}
		}
	}
});