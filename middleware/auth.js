module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    },
    ensureAuthEnd: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401);
            res.send({ Response: 'The request is not authorized because the user is not authenticated.', Solution: 'Please login at https://dry-river-36052.herokuapp.com/ ' });
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            return next();
        }
    }
};
