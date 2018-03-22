/**
 * 购物车
 */

const ShoppingCarModel = require('../models/shopping_car');

const ShoppingCar ={
<<<<<<< HEAD
    //获取购物车详情
    get:(req,res,next)=>{
        let user = req.locals.
        ShoppingCarModel.find().then(doc=>{
            console.log("获取购物车详情成功"+doc);
            res.render('/Shopping_car',{shoppingCarList:doc});
        }).catch(err => {
            console.log("获取购物车详情失败"+err);
        });
=======
    // 注册
    get:(req,res,next)=>{
>>>>>>> ae472f64c62d92ab2d9155c0e03922206a3caa1b

    },

    update:(req,res,next)=>{
       //购物车 id 、书籍id  用户id
        //数量

    },
    delete:(req,res,next)=>{
        //购物车 id 、书籍id  用户id

    },

};

module.exports=ShoppingCar;