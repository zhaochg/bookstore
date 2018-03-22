const bookModel = require('../models/book');

const Home = {
    // 首页
<<<<<<< HEAD
=======
	// 我是赵晓蒙,刚刚修改了这个文件
>>>>>>> 807d8191998953542978e667a1db585c042a48a1

    index: (req, res, next) => {

        //幻灯
        //推荐
        bookModel.find().then(doc => {

        }).catch(err => {

        });
        //广告
        //最新
        //排行榜（畅销榜、新书榜）
        res.render('index', {});
    },

    //分类页
    category: (req, res, next) => {
        //分类列表
            res.render('classification');

        //分类书籍（分页）

        //按销量排序

    },

    //排行榜
    ranking: (req, res, next) => {
        res.render('rank');
        // 书籍列表（分页）畅销与新书切换

    },

    //推荐好书
    tui: (req, res, next) => {
        //书籍列表
            res.render('recommend');

        //排行榜
    },

    news: (req, res, next) => {
        res.render('newBooks');
        //书籍列表

        //排行榜
    },

    // 搜索
    search: (req, res, next) => {
        //书籍列表（分页）
    }

};

module.exports = Home;
