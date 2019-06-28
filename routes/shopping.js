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
router.post('/balance',auth,navbar,clean.index);
// router.post('/balance',auth,navbar,clean.index02);
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
router.post('/delete/:id',Shopping_car.delete);
router.post('/update/:id',Shopping_car.update);
router.get('/count',Shopping_car.count);
/**
 * 删除订单信息
 */
router.post('/orderdel/',order.delete);
module.exports = router;
