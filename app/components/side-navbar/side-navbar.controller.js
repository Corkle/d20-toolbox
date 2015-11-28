appComponents.controller('SidenavCtrl', function() {
  var originEv;
  this.openMenu = function($mdOpenMenu, ev) {
    originEv = ev;
    $mdOpenMenu(ev);
    
  };
});
