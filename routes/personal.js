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
router.post('/addAddress',auth,address.add);
// 更改地址
router.get('/updateAddress/:xiabiao',auth,address.get);

router.post('/updateAddress/:xiabiao',auth,address.update);
// 删除地址
router.post('/del/:xiabiao',auth,address.del);



module.exports = router;
