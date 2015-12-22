var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');

module.exports = function(app) {

	app.route('/register')
		.get(users.renderRegister)
		.post(users.register);
	
	app.route('/login')
		.get(users.renderLogin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));
		
	app.get('/logout', users.logout);
    
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/login',
        authType: 'rerequest',
        scope:['email']
    }));
    
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login',
        successRedirect: '/',
        scope: ['email']
    }));
    
    
    // Remove
    app.route('/users')
		.get(users.list)
		.post(users.create);
		
	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);
	
	app.param('userId', users.userByID);
};