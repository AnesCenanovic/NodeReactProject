const passport = require('passport');

module.exports = (app) =>{
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/surveys'); // Redirect to the home page after login
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