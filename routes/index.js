const express = require('express');
const Home = require('../controllers/home');
const router = express.Router();
const ShoppingCar = require('../controllers/shopping_car');
const auth = require('../middleware/auth');
const book = require('../controllers/book');
const ranking = require('../middleware/ranking');
const user = require('../controllers/personal/user')
const navbar = require('../middleware/navbar');


/**
 *首页
 */
router.get('/', navbar, ranking, Home.index);
/**
 * 推荐好书
 */
router.get('/recommend', navbar , ranking , Home.tui);
/**
 * 最近上架
 */
router.get('/newBooks',navbar , ranking ,Home.news);
/**
 * 分类
 */
router.get('/classification', navbar, Home.category);
/**
 * 排行
 */
router.get('/rank', navbar, Home.ranking);
/**
 * 购物车
 */
router.get('/shopping',auth, navbar ,ShoppingCar.index);
/**
 * 图书详情
 */
router.get('/bookInfor/:id', navbar, ranking ,book.get);
/**
 * 个人中心
 */
router.get('/personal',auth,user.index);




module.exports = router;
