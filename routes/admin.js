const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

/**
 * 登录页
 */
router.get('/login',admin.index);
router.get('/logout',admin.logout)
router.post('/login',admin.login);
/**
 * 书籍
 */
router.get('/index',admin.get);
router.post("/book_update",admin.book_update)
router.post("/delete",admin.delete)
router.post("/create",admin.create)


module.exports = router;