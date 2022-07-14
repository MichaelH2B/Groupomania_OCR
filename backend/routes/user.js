const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const validatePassword = require("../middlewares/validatePassword");
const validateEmail = require("../middlewares/validateEmail");

router.post('/signup', validatePassword, validateEmail, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.delete);
router.get('/getUsers', userCtrl.getAllUsers)
router.get('/getUser/:id', userCtrl.getOneUser)




module.exports = router;