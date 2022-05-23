const express = require('express');
const router = express.Router();
let usersControl = require('../controllers/users');

//route list for the users collection
router.get('/', usersControl.getUsers);
router.get('/:username', usersControl.getUser);
router.post('/', usersControl.createUser);
router.put('/:username', usersControl.updateUser);
router.delete('/:username', usersControl.deleteUser);

module.exports = router;
