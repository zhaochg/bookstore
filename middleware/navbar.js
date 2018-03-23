/**
 * 中间件 --导航条
 */
const ShoppingCarModel = require('../models/shopping_car');

const NavBar = (req,res,next) => {
    let user = res.locals.loginUser;
    if(user){
        ShoppingCarModel.find({user_id:user._id}).count().then(doc => {
            console.log('查询购物车成功');
            res.locals.shopping = doc;
            next();
        }).catch(err => {
            console.log('查询购物车失败'+err);
        });
    }else {
        next();
    }
};
module.exports = NavBar;