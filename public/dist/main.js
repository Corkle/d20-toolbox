function DEBUG(n,e){var o=new Date,s=o.toLocaleTimeString();console.log(s,n,e)}var appName="toolboxApp",app=angular.module(appName,["ngMaterial","ui.router","toolboxApp.components","templates","appSvgIcons","appServices"]);app.config(["$locationProvider",function(n){n.html5Mode(!0).hashPrefix("!")}]),app.controller("AppCtrl",["pageConfig",function(n){this.sidenavFolded=n.sidenavFolded.get()}]);var appComponents=angular.module("toolboxApp.components",["navMenu","appSvgIcons"]);appComponents.controller("SideNavCtrl",["svgIcons",function(n){this.svgIcons=n}]),appComponents.controller("TopNavCtrl",["svgIcons","$mdSidenav",function(n,e){this.svgIcons=n,this.openSidenav=function(){e("left-nav").open()}}]),angular.module("appSvgIcons",[]).service("svgIcons",function(){var n="src/assets/img/icons/";return{account:n+"account.svg",apps:n+"apps.svg",chevronUp:n+"chevron-up.svg",d20:n+"d20.svg",dotsVertical:n+"dots-vertical.svg",mathCompass:n+"math-compass.svg",menu:n+"menu.svg",menuUp:n+"menu-up.svg",sword:n+"sword.svg"}});var navMenuComponent=angular.module("navMenu",["appSvgIcons"]),appServices=angular.module("appServices",[]);appServices.service("pageConfig",function(){var n=!1;return{sidenavFolded:{get:function(){return n},set:function(e){n=e}}}}),navMenuComponent.controller("NavMenuCtrl",["$scope","$element","$attrs","svgIcons",function(n,e,o,s){n.svgIcons=s,n.canToggle=!1,o.hasOwnProperty("toggleMenu")&&(n.canToggle=!0);var a=[];this.addToMenuToggles=function(n){a.push(n)},this.openToggleList=function(e){n.closeAllLists(),e.isOpen=!0},n.closeAllLists=function(){if(a.length>0)for(var n=0;n<a.length;n++)a[n].isOpen=!1}}]),navMenuComponent.directive("navMenu",function(){return{require:"?^^navMenu",restrict:"EA",transclude:!0,scope:{title:"@",labelIcon:"@"},controller:"NavMenuCtrl",templateUrl:"nav-menu/nav-menu/nav-menu.html",link:function(n,e,o,s){n.isBase=s?!1:!0,n.isBase?n.isOpen=!0:(n.isOpen=!1,s.addToMenuToggles(n),n.toggleList=function(){n.isOpen?n.isOpen=!1:s.openToggleList(n)},n.$watch("isOpen",function(e){e||n.closeAllLists()}))}}}),appComponents.directive("menuLink",function(){return{require:"^navMenu",restrict:"E",transclude:!0,scope:{labelIcon:"@"},templateUrl:"nav-menu/nav-menu/menu-link/menu-link.html"}}),angular.module("templates",[]).run(["$templateCache",function(n){n.put("nav-menu/nav-menu/nav-menu.html",'<li ng-show="title" ng-class="{\'toggle-list-open\': isOpen && canToggle}"><a class="layout-row md-button" ng-class="{\'md-button-toggle\': canToggle}" ng-click="toggleList()" md-ink-ripple layout="row"><md-icon ng-show="labelIcon" md-svg-src="{{labelIcon}}" class="nav-menu-label-icon"></md-icon><span ng-bind="title" flex></span> <span><div ng-if="canToggle"><md-icon md-svg-src="{{svgIcons.chevronUp}}" class="md-toggle-icon" ng-class="{\'toggled\': isOpen}"></md-icon></div><div ng-if="!canToggle"><md-icon></md-icon></div></span></a></li><ul ng-class="{\'menu-toggle-list\': canToggle, \'collapsed\': !isOpen, \'hidden-folded\': !isBase}"><div ng-transclude></div></ul>'),n.put("nav-menu/nav-menu/menu-link/menu-link.html",'<li ng-class="{\'hidden-folded\': {{!labelIcon}}}"><a class="md-button" md-ink-ripple layout="row"><md-icon ng-show="labelIcon" md-svg-src="{{labelIcon}}" class="nav-menu-label-icon"></md-icon><span ng-transclude flex></span> <span><md-icon></md-icon></span></a></li>')}]);