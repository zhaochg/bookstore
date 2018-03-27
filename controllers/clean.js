

const bookModel = require('../models/book');
const shoppingCarModel = require('../models/shopping_car');
const Clean = {
    // 结算页
    index:(req,res,next)=>{
        // 书籍id   数组
        let book_id = req.query.book_id;
        let num = req.query.num;
        let alt =req.query.alt;
        let myOrder = [];
        if(alt == 1){
            bookModel.findOne({_id:book_id}).then(doc=>{
                let  orderInfor = {
                    num:num,
                    book_id:doc
                }
                myOrder.push(orderInfor);
                res.render('balance',{
                    user:res.locals.loginUser,
                    shoppingCar:res.locals.shopping,
                    myOrder:myOrder
                })
            }).catch(err=>{
               console.log('结算页获取图书失败'+err);
            });
        }
        // 用户地址
    },
    index02:(req,res,next)=>{
        let shoppingCar = [];
        let shoppingCar_id = req.body.shoppingCar_id;
        if(typeof shoppingCar_id == 'string'){
            shoppingCar.push(shoppingCar_id);
        }else {
            for(let n=0;n<shoppingCar_id.length;n++){
                shoppingCar.push(shoppingCar_id[n]);
            }
        }
        //console.log(shoppingCar);
        shoppingCarModel.find({_id:{$in:shoppingCar}}).populate('book_id').then(doc=>{
            console.log(doc);
            res.render('balance',{
                user:res.locals.loginUser,
                shoppingCar:res.locals.shopping,
                myOrder:doc,
            })
        }).catch(err=>{
            console.log('结算页查询购物车信息失败'+err);
        });
    }
};

module.exports= Clean;