const express = require('express');
const Home = require('../controllers/home');
const router = express.Router();

/**
 *首页
 */
router.get('/', Home.index);
/**
 * 推荐好书
 */
router.get('/recommend',function (req,res,next) {
    res.render('recommend');
});
/**
 * 最近上架
 */
router.get('/newBooks',function (req,res,next) {
    res.render('newBooks');
});
/**
 * 分类
 */
router.get('/classification',function (req,res,next) {
    res.render('classification');
});
/**
 * 排行
 */
router.get('/rank',function (req,res,next) {
    res.render('rank');
});
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
 * 购物车
 */
router.get('/shopping',function (req,res,next) {
    res.render('Shopping_car');
});
/**
 * 图书详情
 */
router.get('/bookInfor',function (req,res,next) {
    res.render('bookInfor');
});
/**
 * 个人中心
 */
router.get('/personal',function (req,res,next) {
    res.render('personal');
});




module.exports = router;
