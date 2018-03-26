const express = require('express');
const router = express.Router();
const Shopping_car = require('../controllers/shopping_car');
const auth = require('../middleware/auth');
const navbar = require('../middleware/navbar');
const clean = require('../controllers/clean');

/**
 * 结算页
 */
router.get('/balance',auth, navbar,clean.index);
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
router.post('/add',auth,Shopping_car.add);
/**
 * 删除购物车信息
 */
router.get('/delete',Shopping_car.delete);

module.exports = router;
