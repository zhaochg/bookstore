/**
 * 购物车
 */

const ShoppingCarModel = require('../models/shopping_car');

const ShoppingCar ={
    //获取购物车详情
    index:(req,res,next)=> {
        ShoppingCarModel.find().then(doc => {
            console.log("获取购物车详情成功" + doc);
            res.render('/Shopping_car', {shoppingCarList: doc});
        }).catch(err => {
            console.log("获取购物车详情失败" + err);
        });
    },
    // 注册
    get:(req,res,next)=>{

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