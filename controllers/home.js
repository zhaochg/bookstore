const bookModel = require('../models/book');

const Home = {
    // 首页
    index: (req, res, next) => {
        let tui_List = '';
        let news_List = res.locals.news_List;
        let xiao_List = res.locals.xiao_List;
        let where = {is_tui:1};
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        //幻灯
        //推荐
        bookModel.find(where).limit(8).sort({score:'desc'}).then(doc => {
            console.log('所有书籍'+doc);
            tui_List = doc;
            //最新
            res.render('index', {
                tui_List:tui_List,
                news_List:news_List,
                xiao_List:xiao_List,
                user:user,
                shoppingCar:shoppingCar
            });
        }).catch(err => {
            console.log('查询推荐书籍失败'+ err);
        });
        //广告

    },


    //分类页
    category: (req, res, next) => {
        //分类列表
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
            res.render('classification',{
                user:user,
                shoppingCar:shoppingCar
            });
        //分类书籍（分页）

        //按销量排序

    },

    //排行榜
    ranking: (req, res, next) => {
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        // 书籍列表（分页）畅销与新书切换
        let news_List = '';
        let xiao_List ='';
        let  count = 0;
        let  limit = 8;
        let  page=req.query.page?req.query.page:1;
        let  pagex=req.query.pagex?req.query.pagex:1;
        let totalPage = 0;
        let where = {};
        let alt = req.query.alt;
        //最新
        bookModel.find().count().then(doc => {
            // console.log('所有书籍'+doc);
            count = doc;
            totalPage=Math.ceil(count/limit);
            console.log(totalPage);
            //排行榜（畅销榜、新书榜）
            bookModel.find(where).skip((page-1)*limit).limit(limit).sort({order_cnt:"desc",create_at:"desc"}).then(doc => {
                // console.log('所有书籍'+doc);
                xiao_List = doc;
                bookModel.find(where).skip((pagex-1)*limit).limit(limit).sort({create_at:"asc"}).then(doc => {
                    news_List = doc;
                    res.render('rank', {
                    news_List:news_List,
                    xiao_List:xiao_List,
                    count:count,
                    page:page,
                    pagex:pagex,
                    totalPage:totalPage,
                    alt:alt,
                    user:user,
                    shoppingCar:shoppingCar
                });
                }).catch(err => {
                    console.log('查询熱销书籍失败'+ err);
                });
            }).catch(err => {
                console.log('查询熱销书籍失败'+ err);
            });
        }).catch(err => {
            console.log('查询新书书籍失败'+ err);
        });
        //广告

    },

    //推荐好书
    tui: (req, res, next) => {
        //书籍列表
        let news_List = res.locals.news_List;
        let xiao_List = res.locals.xiao_List;
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        res.render('recommend',{
            user:user,
            shoppingCar:shoppingCar,
            news_List:news_List,
            xiao_List:xiao_List
        });
        //排行榜
    },

    news: (req, res, next) => {

        let news_List = res.locals.news_List;
        let xiao_List = res.locals.xiao_List;
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        res.render('newBooks',{
            user:user,
            shoppingCar:shoppingCar,
            news_List:news_List,
            xiao_List:xiao_List
        });
        //书籍列表

        //排行榜
    },

    // 搜索
    search: (req, res, next) => {
        //书籍列表（分页）
    }

};

module.exports = Home;
