const express = require('express');
const router = express.Router();
const Login = require('../controllers/login');
const Register = require('../controllers/regisder');

/**
 * 登录页
 */
router.get('/login',Login.index);

/**
 * 注册页
 */
router.get('/register',Register.index);



module.exports = router;
