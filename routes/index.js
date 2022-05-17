const router = require('express').Router();

// router list
router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));

module.exports = router;