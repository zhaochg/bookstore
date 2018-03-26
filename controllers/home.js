const bookModel = require('../models/book');
const CategoryModel = require('../models/category');

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
        //分类书籍（分页，销量，评分，时间）
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        let pname = req.query.pname;//当前父分类名字
        let cname = req.query.cname;//当前子分类名字
        let cid = req.query.cid;//当前子分类id

        let order_cnt = req.query.order_cnt ? req.query.order_cnt : 0;//订单数量
        let price = req.query.price ? req.query.price : 0;//价格
        let page = req.query.page ? req.query.page : 1;//页数

        let count = 0;
        let limit = 12;
        let totalPage = 0;
        let where = {};
        let sort = {};

        let pageInfo = {page: page, order_cnt: order_cnt, price: price};//三个数据集
        if (pname && cname && cid) {
            pageInfo.pname = pname;
            pageInfo.cname = cname;
            pageInfo.cid = cid;
        }
        if (order_cnt != 0 && order_cnt == 1 || order_cnt == -1) {//订单
            sort.order_cnt = order_cnt;
        }
        if (price != 0 && price == 1 || price == -1) {//价格
            sort.price = price;
        }
        if (pname && cname && cid) {//分类id
            where.category_id = cid
        }
        // $ne表示不相等
        const CategoryFun = CategoryModel.find({category: {$ne: []}}).populate('category');//类别
        const BookCount = bookModel.find(where).count();//数量
        const BookFun = bookModel.find(where).populate('author_id').skip((page - 1) * limit).limit(limit).sort(sort); //推荐
        // 并行加载
        Promise.all([CategoryFun, BookCount, BookFun]).then(([categoryData, countData, BookData]) => {
            count = countData;
            totalPage = Math.ceil(count / limit);
            pageInfo.count = count;
            pageInfo.totalPage = totalPage;
            console.log('111'+categoryData);
            console.log('222'+BookData);
            console.log('333'+pageInfo);
            res.render("classification", {
                user:user,
                shoppingCar:shoppingCar,
                title: "图书分类",
                category: categoryData,
                bookData: BookData,
                pageInfo: pageInfo,
            });
        }).catch(reject => {
            res.json({
                status: 0,
                msg: '网络异常'
            });
        })

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
        //分页
        let count = 0;
        let limit = 8;
        let page = req.query.page?req.query.page:1;
        let totalPage = 0;
        let where = {};
        bookModel.find(where).count().then(doc => {
            count = doc;
            totalPage=Math.ceil(count/limit);
            bookModel.find(where).populate('author_id').skip((page-1)*limit).limit(limit).sort({order_cnt:"desc"}).then(doc => {
                res.render('recommend',{
                    user:user,
                    shoppingCar:shoppingCar,
                    news_List:news_List,
                    xiao_List:xiao_List,

                    chang_List:doc,
                    count:count,
                    totalPage:totalPage,
                    page:page
                });
            }).catch(err => {
                console.log('查询畅销书籍失败'+err);
            });
        }).catch(err => {
            console.log('查询畅销书籍总数失败'+err);
        });
    },

    news: (req, res, next) => {

        let news_List = res.locals.news_List;
        let xiao_List = res.locals.xiao_List;
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        //分页
        let count = 0;
        let limit = 8;
        let page = req.query.page?req.query.page:1;
        let totalPage = 0;
        let where = {};
        bookModel.find(where).count().then(doc => {
            count = doc;
            totalPage=Math.ceil(count/limit);
            bookModel.find(where).populate('author_id').skip((page-1)*limit).limit(limit).sort({create_at:"desc"}).then(doc => {
                res.render('newBooks',{
                    user:user,
                    shoppingCar:shoppingCar,
                    news_List:news_List,
                    xiao_List:xiao_List,
                    new_List:doc,
                    count:count,
                    totalPage:totalPage,
                    page:page
                });
            }).catch(err => {
                console.log('查询畅销书籍失败'+err);
            });
        }).catch(err => {
            console.log('查询畅销书籍总数失败'+err);
        });
    },

    // 搜索
    search: (req, res, next) => {
        //书籍列表（分页）
    }

};

module.exports = Home;
