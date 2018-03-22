const express = require('express');
const router = express.Router();
const Shopping_car = require('../controllers/shopping_car');
const auth = require('../middleware/auth');

/**
 * 结算页
 */
router.get('/balance',auth,function (req,res,next) {
    res.render('balance');
});
/**
 * 确认支付
 */
router.get('/firm',auth,function (req,res,next) {
    res.render('firm');
});
/**
 * 完成支付
 */
router.get('/pay',auth,function (req,res,next) {
    res.render('pay');
});

/**
 * 加入购物车
 */
router.post('/shopping',auth,Shopping_car.add);


module.exports = router;
