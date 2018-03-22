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
router.get('/recommend', Home.tui);
/**
 * 最近上架
 */
router.get('/newBooks',Home.news);
/**
 * 分类
 */
router.get('/classification',Home.category);
/**
 * 排行
 */
router.get('/rank',Home.ranking);

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
