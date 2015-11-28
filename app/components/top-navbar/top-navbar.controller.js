appComponents.controller('NavCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
  this.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
}])