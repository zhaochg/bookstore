/**
 * 购物车
 */

const ShoppingCarModel = require('../models/shopping_car');

const ShoppingCar ={
    //获取购物车详情
    index:(req,res,next)=> {
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        ShoppingCarModel.find({user_id:user._id}).populate('book_id').then(doc => {
            console.log("获取购物车详情成功");
            res.render('Shopping_car', {
                shoppingCarList: doc,
                user:user,
                shoppingCar:shoppingCar
            });
        }).catch(err => {
            console.log("获取购物车详情失败" + err);
        });
    },
    // 加入购物车
    add:(req,res,next)=>{
        let user = res.locals.loginUser;
        let num = req.body.num;
        console.log(num);
        let book_id = req.body.book_id;
        console.log(book_id);
        //判断是否有此书籍
        ShoppingCarModel.find({user_id:user._id}).then(doc=>{
            let myBook = true;
            for(let i=0;i<doc.length;i++){
                let book_num = doc[i].num;
                if(book_id==doc[i].book_id){
                    myBook = false;
                    book_num = parseInt(book_num) + parseInt(num);
                    ShoppingCarModel.update({book_id:doc[i].book_id},{num:book_num}).then(doc=>{
                        console.log('加入购物车成功'+doc);
                        req.flash('error','添加成功');
                        res.redirect('/bookInfor/'+book_id);
                    }).catch(err=>{
                        console.log('加入购物车失败'+err);
                    });
                    return;
                }
            }
            if(myBook){
                ShoppingCarModel.create({
                    user_id:user._id,
                    num:num,
                    book_id:book_id
                }).then(doc=>{
                    console.log('加入购物车成功'+doc);
                    req.flash('error','添加成功');
                    res.redirect('/bookInfor/'+book_id);
                }).catch(err=>{
                    console.log('加入购物车失败'+err);
                });
            }
        }).catch(err=>{
            console.log('加入购物车失败'+err);
        });



    },
    //更新购物车
    update:(req,res,next)=>{
       //购物车 id 、书籍id  用户id
       // 数量

    },
    //删除购物车
    delete:(req,res,next)=>{
        //购物车 id 、书籍id  用户id
        let id = req.query.shoppingCar_id;
        ShoppingCarModel.remove({_id:id}).then(doc=>{
            console.log('删除购物车一条信息');
            console.log(doc);
            req.flash("error",'已删除');
            res.redirect('/shopping');
        }).catch(err=>{
           console.log('删除购物车信息失败'+err);
        });

    },

};

module.exports=ShoppingCar;