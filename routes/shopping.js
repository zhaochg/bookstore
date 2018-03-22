const express = require('express');
const router = express.Router();
const Shopping_car = require('../controllers/shopping_car');

/**
 * 结算页
 */
router.get('/balance',function (req,res,next) {
    res.render('balance');
});
/**
 * 确认支付
 */
router.get('/firm',function (req,res,next) {
    res.render('firm');
});
/**
 * 完成支付
 */
router.get('/pay',function (req,res,next) {
    res.render('pay');
});

/**
 * 加入购物车
 */
router.post('/shopping',Shopping_car.get);


module.exports = router;
