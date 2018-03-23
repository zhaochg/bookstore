const bookModel = require('../models/book');

const Home = {
    // 首页
    index: (req, res, next) => {
        let tui_List = '';
        let news_List = '';
        let ad_List = '';
        let xiao_List ='';
        let  where={is_tui:1};
        //幻灯
        //推荐

        bookModel.find(where).limit(8).sort({score:'desc'}).then(doc => {
            console.log('所有书籍'+doc);
            tui_List = doc;
            //最新
            bookModel.find().limit(8).sort({ create_at:"desc"}).then(doc => {
                console.log('所有书籍'+doc);
                news_List = doc;
                //排行榜（畅销榜、新书榜）
                bookModel.find().limit(5).sort({order_cnt:"desc"}).then(doc => {
                    console.log('所有书籍'+doc);
                    xiao_List = doc;
                    res.render('index', {
                        tui_List:tui_List,
                        news_List:news_List,
                        xiao_List:xiao_List,
                    });
                }).catch(err => {
                    console.log('查询选项卡书籍失败'+ err);
                });
            }).catch(err => {
                console.log('查询新书书籍失败'+ err);
            });
        }).catch(err => {
            console.log('查询推荐书籍失败'+ err);
        });
        //广告
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
