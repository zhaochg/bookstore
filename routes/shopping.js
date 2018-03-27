const express = require('express');
const router = express.Router();
const Shopping_car = require('../controllers/shopping_car');
const auth = require('../middleware/auth');
const navbar = require('../middleware/navbar');
const clean = require('../controllers/clean');
const order = require('../controllers/order');

/**
 * 结算页
 */
router.get('/balance',auth,navbar,clean.index);
router.post('/balance',auth,navbar,clean.index02);
/**
 * 确认支付
 */
router.post('/firm',auth,navbar,order.create);
router.get('/firm/:order_id',auth,navbar,order.index);
/**
 * 完成支付
 */
router.get('/pay/:order_id',auth,navbar,order.pay);
router.post('/pay',auth,navbar,order.goPay);
/**
 * 加入购物车
 */
router.post('/add',auth,Shopping_car.add);
/**
 * 删除购物车信息
 */
router.get('/delete',Shopping_car.delete);

module.exports = router;
