angular.module('toolboxApp').controller('MyController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
});

angular.module('toolboxApp').controller('NavCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
  this.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
}])