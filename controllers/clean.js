

const bookModel = require('../models/book');
const shoppingCar = require('../models/shopping_car');
const Clean = {
    // 结算页
    index:(req,res,next)=>{
        // 书籍id   数组


        let book_id = req.query.book_id;
        let num = req.query.num;
        bookModel.findOne({_id:book_id}).then(doc=>{
            res.render('balance',{
                user:res.locals.loginUser,
                shoppingCar:res.locals.shopping,
                bookInfor:doc,
                num:num
            })
        }).catch(err=>{
           console.log('结算页获取图书失败'+err);
        });
        // 用户地址
    }
};

module.exports= Clean;