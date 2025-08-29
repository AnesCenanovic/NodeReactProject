module.exports = (req, res, next) => {
    // Passport attaches the 'user' object to the request if the user is logged in.
    // If there is no req.user, it means they are not authenticated.
    if (!req.user) {
        // We stop the request and send back an error.
        // 401 is the standard HTTP code for "Unauthorized".
        return res.status(401).send({ error: 'You must log in!' });
    }
    next();
};