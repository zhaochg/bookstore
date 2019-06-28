/**
 * 订单页
 */
const OrderModel = require('../models/order');
const BookModel = require('../models/book');
const Shopping = require('../models/shopping_car');
const moment = require("moment");
// var Alipay = require('../library/alipay');
// const path = require('path');
const Order = {
    //订单详情
    index:(req,res,next)=>{
    let user = res.locals.loginUser;
    let shoppingCar = res.locals.shopping;
    let order_id = req.params.order_id;
    console.log("order_id",order_id)
    OrderModel.findOne({_id:order_id}).then(doc=>{
        console.log("查询订单成功");
    console.log(doc);
    res.render('firm',{
        list:doc,
        user:user,
        addr:user.address[0]
    })
}).catch(err=>{
        console.log("查询订单失败"+err);
})
},
    // // 创建订单
    // create:(req,res,next)=>{
    //
    //     let user = res.locals.loginUser;
    //     let book_id = req.body.book_id;//这是一个数组
    //     book_id = eval('(' + book_id + ')');
    //     let book = [];
    //     let num = req.body.num;//这是一个数组
    //     num = eval('(' + num + ')');
    //     let address_num = req.body.address_num;
    //     // 书籍id   数组
    //     //书籍数量（数组）
    //     BookModel.find({_id:{$in:book_id}}).then(doc=>{
    //         console.log(doc);
    //         for(let j=0; j<doc.length; j++){
    //             let myBook = {
    //                 id:doc[j]._id,
    //                 name:doc[j].name,
    //                 img:doc[j].img,
    //                 num:num[j],
    //                 price:doc[j].price,
    //                 total_price:num[j]*doc[j].price
    //             };
    //             book.push(myBook);
    //         }
    //         //用户地址
    //         let receive = {
    //             name:"text3",
    //             phone:"text3",
    //             address:"text3"
    //         };
    //         for(let i = 0 ; i<user.address.length;i++){
    //             if(i == address_num){
    //                 let address = user.address[i].address;
    //                 let phone = user.address[i].phone;
    //                 let name = user.address.name;
    //                 receive = {
    //                     name:name,
    //                     phone:phone,
    //                     address:address
    //                 };
    //                 console.log(receive);
    //             }
    //         }
    //         //快递信息
    //         let send = {
    //             kd_name:'顺丰快递',
    //             kd_num:'22222222',
    //             kd_at:new Date()
    //         };
    //         //总价
    //         let total_price = '';
    //         for(let k = 0; k<book.length; k++){
    //             total_price += parseInt(book[k].total_price);
    //         }
    //         //订单信息
    //         let order = {
    //             user_id:user._id,
    //             book:book,
    //             total_price:total_price,
    //             receive:receive,
    //             send:send
    //         };
    //         //console.log(order);
    //         //生成订单
    //         OrderModel.create(order).then(doc=>{
    //             console.log('创建订单成功');
    //             res.json({
    //                 status:1,
    //                 msg:'创建成功',
    //                 order_id:doc._id
    //             });
    //         }).catch(err=>{
    //             console.log('创建订单失败'+err);
    //         });
    //
    //     }).catch(err=>{
    //         console.log('循环查询购买书籍失败'+err);
    //     });
    //
    //
    // },
    // 创建订单
    create:(req,res,next)=>{
        // 书籍id   数组
        //书籍数量（数组）
        // 用户地址
        //生成订单
        console.log("....",12588)
        let user = res.locals.loginUser;
        let orArr=[];
        let shopping_car = req.body.shopping_car_id;
        let address_index = req.body.address_index;
        if(shopping_car instanceof Array){
            for(let i = 0;i<shopping_car.length;i++){
                orArr.push({
                    _id:shopping_car[i]
                })
            }
        }else{
            orArr.push({
                _id:shopping_car
            })
        }
        Shopping.find({user_id:user._id,$or:orArr}).populate({path:"book_id",populate:{path:"author_id"}}).populate("user_id").then(doc=> {
            let order_num = moment().format('YYYYMMDDHHmmss')+parseInt(Math.random()*10000);
            let total_price = 0;
            let total_num = 0;
            let bookList = [];
            let receive = {
                // name:user.address[address_index].name,
                // phone:user.address[address_index].phone,
                // address:user.address[address_index].address,
            };
            for(let i = 0;i < doc.length;i++){
                bookList.push({
                    book_id:doc[i].book_id._id,
                    name:doc[i].book_id.name,
                    author:doc[i].book_id.author_id.name,
                    price:doc[i].book_id.price,
                    num:doc[i].num,
                    total_price:(parseInt(doc[i].book_id.price) * parseInt(doc[i].num))
                })
                total_num += doc[i].num;
                total_price += (parseInt(doc[i].book_id.price) * parseInt(doc[i].num));
            }
            OrderModel.create({
                order_num:order_num,
                total_num:total_num,
                total_price:total_price,
                user_id:user._id,
                receive:receive,
                book:bookList

            }).then(doc=>{
                console.log("地址数据",doc,"000..34",user.address.name)
                let list = doc
                Shopping.remove({user_id:user._id,$or:orArr}).then(doc=>{
                    console.log("删除成功!",doc)
                    res.render("firm",{
                        list:list,
                        user:user,
                        addr:user.address[0]
                    })
                }).catch(err=>{
                    console.log("err",err)
                })

            })
        })
        // 用户地址

    },
    //删除订单
    delete:(req,res,next)=>{
        let id = req.body.id
        OrderModel.remove({_id:id}).then(doc=>{
            res.json({
                status:1,
                msg:"删除成功!"
            })
        }).catch(err=>{
            res.json({
                status:1,
                msg:"删除失败!"
            })
        })
    },
    //订单支付
    pay:(req,res,next)=>{
        //订单号
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        let order_id = req.params.order_id;
        OrderModel.findOne({order_num:order_id}).then(doc=>{
            console.log("查询订单成功");
            console.log(doc);
            res.render('pay',{
                user:user,
                shoppingCar:shoppingCar,
                order:doc
            })
        }).catch(err=>{
            console.log("查询订单失败"+err);
        })
    },
    //支付成功
    goPay:(req,res,next)=>{
        let user = res.locals.loginUser;

        //订单号
        let order_id = req.body.order_id;
        let pay_type = parseInt(req.body.optionsRadios);
        //console.log(order_id);
        OrderModel.update({_id:order_id},{
            pay_type:pay_type,
            pay_at:new Date(),
            status: 1
        }).then(doc=>{
            console.log('支付方式选择成功' + doc);
            res.render("paysuc",{
                user:user
            });
        }).catch(err=>{
            console.log('支付订单获取失败'+err);
        })

    },
};

module.exports = Order;