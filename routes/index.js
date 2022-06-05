const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const dotenv = require('dotenv');
dotenv.config();

//Login/Landing Page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render('login', { layout: 'login' });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render('dashboard', {
        name: req.user.firstName
    });
});

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));

module.exports = router;
