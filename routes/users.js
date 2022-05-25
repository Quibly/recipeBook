const express = require('express');
const router = express.Router();
let usersControl = require('../controllers/users');
const { userValidation } = require('../validation');
const { validationResult } = require('express-validator');

//route list for the users collection
router.get('/', usersControl.getUsers);
router.get('/:username', usersControl.getUser);
router.post('/', userValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    usersControl.createUser(req, res);
});
router.put('/:username', usersControl.updateUser);
router.delete('/:username', usersControl.deleteUser);

module.exports = router;
