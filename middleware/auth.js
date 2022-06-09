module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log(`Request is: ${req.isAuthenticated()}`);
            return next();
        } else {
            res.redirect('/');
        }
    },
    ensureAuth2: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
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
