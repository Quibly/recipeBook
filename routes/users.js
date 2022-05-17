const express = require('express');
const router = express.Router();
let usersControl = require('../controllers/users');


router.get('/', usersControl.getUsers);
router.get('/:username', usersControl.getUser);
router.post('/', usersControl.createUser);
router.put('/:username', usersControl.updateUser);
router.put('/:username', usersControl.deleteUser);

module.exports = router;