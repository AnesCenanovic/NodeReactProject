const passport = require('passport');
const keys = require('../config/keys');

module.exports = (app) =>{
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect(keys.clientURL + '/surveys'); // Redirect to the home page after login
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) =>  {
        res.send(req.user);
    });
};