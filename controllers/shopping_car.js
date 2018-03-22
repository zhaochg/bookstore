/**
 * 购物车
 */

const ShoppingCarModel = require('../models/shopping_car');

const ShoppingCar ={
    //获取购物车详情
    index:(req,res,next)=> {
        let user = res.locals.loginUser;
        ShoppingCarModel.find({user_id:user._id}).then(doc => {
            console.log("获取购物车详情成功" + doc);
            res.render('/shopping', {shoppingCarList: doc});
        }).catch(err => {
            console.log("获取购物车详情失败" + err);
        });
    },
    // 加入购物车
    get:(req,res,next)=>{
        let user = res.locals.loginUser;
        let num = req.body.num;
        let book_id = req.body.book_id;
        ShoppingCarModel.creat({
            user_id:user._id,
            num:num,
            book_id:book_id
        }).then(doc=>{
            console.log('加入购物车成功'+doc);
            res.json({
               status:1,
               msg:'加入购物车成功'
            });
        }).catch(err=>{
            console.log('加入购物车失败'+err);
            res.json({
                status:0,
                msg:'加入购物车失败'
            })
        });
    },
    //更新购物车
    update:(req,res,next)=>{
       //购物车 id 、书籍id  用户id
        //数量

    },
    //删除购物车
    delete:(req,res,next)=>{
        //购物车 id 、书籍id  用户id

    },

};

module.exports=ShoppingCar;