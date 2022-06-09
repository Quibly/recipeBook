const express = require('express');
const router = express.Router();
let usersControl = require('../controllers/users');
const { userValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuthEnd } = require('../middleware/auth');

//route list for the users collection
router.get('/', ensureAuthEnd, usersControl.getUsers);
router.get('/:username', ensureAuthEnd, usersControl.getUser);
router.post('/', ensureAuthEnd, userValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    usersControl.createUser(req, res);
});
router.put('/:username', ensureAuthEnd, userValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    usersControl.updateUser(req, res);
}); //usersControl.updateUser);
router.delete('/:username', ensureAuthEnd, usersControl.deleteUser);

module.exports = router;
