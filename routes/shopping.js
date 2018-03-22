const express = require('express');
const router = express.Router();

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

module.exports = router;
