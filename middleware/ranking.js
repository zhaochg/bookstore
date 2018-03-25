/**
 * 排行榜中间件
 */
const bookModel = require('../models/book');

const Ranking =(req,res,next)=>{
    let news_List = '';
    let xiao_List = '';
    bookModel.find().populate('author_id').limit(8).sort({create_at:"desc"}).then(doc => {
        //console.log('所有书籍'+doc);
        news_List = doc;
        //排行榜（畅销榜、新书榜）
        bookModel.find().populate('author_id').limit(5).sort({order_cnt:"desc"}).then(doc => {
            //console.log('所有书籍'+doc);
            xiao_List = doc;
            res.locals.news_List = news_List;
            res.locals.xiao_List = xiao_List;
            //console.log('作者姓名'+news_List.author_id);
            next();
        }).catch(err => {
            console.log('查询选项卡书籍失败'+ err);
        });
    }).catch(err => {
        console.log('查询新书书籍失败'+ err);
    });
};
module.exports = Ranking;