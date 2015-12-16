angular.module('appSvgIcons', [])
	.service('svgIcons', function () {
		var iconsFolder = 'src/assets/img/icons/';

		return {
			account: iconsFolder + 'account.svg',
			apps: iconsFolder + 'apps.svg',
			chevronUp: iconsFolder + 'chevron-up.svg',
			d20: iconsFolder + 'd20.svg',			
			dotsVertical: iconsFolder + 'dots-vertical.svg',
			facebookBox: iconsFolder + 'facebook-box.svg',
			googlePlus: iconsFolder + 'google-plus-box.svg',
			mathCompass: iconsFolder + 'math-compass.svg',
			menu: iconsFolder + 'menu.svg',	
			menuUp: iconsFolder + 'menu-up.svg',
			sword: iconsFolder + 'sword.svg',
			twitter: iconsFolder + 'twitter.svg'
		}
	})