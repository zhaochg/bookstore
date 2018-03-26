const express = require('express');
const router = express.Router();
const user = require('../controllers/personal/user');
const address = require('../controllers/personal/address');
const auth = require('../middleware/auth');
/**
 * 个人中心
 */
//修改个人设置
router.post('/personal',auth,user.save);

// 修改个人密码
router.post('/password',auth,user.password);

//获取地址
router.get('/address',auth,address.index);
//添加地址
router.post('/addAddress',address.add);
//更改地址
router.post('/updateAddress',auth,address.update);
//删除地址
router.post('/del',auth,address.delete);



module.exports = router;
