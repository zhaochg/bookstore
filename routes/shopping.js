const express = require('express');
const router = express.Router();
const Shopping_car = require('../controllers/shopping_car');
const auth = require('../middleware/auth');
const navbar = require('../middleware/navbar');

/**
 * 结算页
 */
router.get('/balance',auth, navbar, function (req,res,next) {
    let user = res.locals.user;
    let shoppingCar = res.locals.shopping;
    res.render('balance',{
        user:user,
        shoppingCar:shoppingCar
    });
});
/**
 * 确认支付
 */
router.get('/firm',auth,function (req,res,next) {
    let user = res.locals.user;
    let shoppingCar = res.locals.shopping;
    res.render('firm',{
        user:user,
        shoppingCar:shoppingCar
    });
});
/**
 * 完成支付
 */
router.get('/pay',auth,function (req,res,next) {
    let user = res.locals.user;
    let shoppingCar = res.locals.shopping;
    res.render('pay',{
        user:user,
        shoppingCar:shoppingCar
    });
});

/**
 * 加入购物车
 */
router.post('/shopping',auth,Shopping_car.add);


module.exports = router;
