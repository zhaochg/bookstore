// 书籍详情
const bookModel = require('../models/book');
const Book ={
    /**
    // 详情页
    **/
    get:(req,res,next)=>{
        //书籍id
        let id = req.params.id;
        let news_List = res.locals.news_List;
        let xiao_List = res.locals.xiao_List;
        bookModel.findOne({_id:id}).then(doc=>{
            console.log('查询书籍详情成功');

            let author = doc.author_id;
            res.render('bookInfor',{
                book:doc,
                author:author,
                news_List:news_List,
                xiao_List:xiao_List
            });
        }).catch(err=>{
            console.log('查无此书'+err);
        });





        //书籍详情

        //书籍分类畅销榜

        //作者书籍榜

        //书籍评论

    },

};

module.exports = Book;