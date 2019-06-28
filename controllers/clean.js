

const bookModel = require('../models/book');
const shoppingCarModel = require('../models/shopping_car');
const Clean = {
    // 结算页
    index:(req,res,next)=>{
        // 书籍id   数组
        let user = res.locals.loginUser;
        let orArr=[];
        let shopping_car = req.body.shopping_car;
        console.log("dsd",shopping_car instanceof Array)
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
        console.log("...0",shopping_car)

        // res.render("balance")
        shoppingCarModel.find({user_id:user._id,$or:orArr}).populate({path:"book_id",populate:{path:"author_id"}}).populate("user_id").then(doc=>{
            console.log("doc",doc)
            let list = [];
            let total_num = 0;
            let total_price = 0;
            for(let i = 0;i<doc.length;i++){
                list.push({
                    shopping_car_id:doc[i]._id,
                    name:doc[i].book_id.name,
                    num:doc[i].num,
                    price:doc[i].book_id.price,
                    author:doc[i].book_id.author_id.name,
                    book_id:doc[i].book_id._id,
                    total_price:(parseInt(doc[i].book_id.price) * parseInt(doc[i].num))

                });
                total_num += doc[i].num;
                total_price += (parseInt(doc[i].book_id.price) * parseInt(doc[i].num));
            }
            console.log("数据",list,"  ",total_num)
            res.render("balance",{
                list:list,
                total_num:total_num,
                total_price:total_price,
                address:user.address,
                user:user
            })
        }).catch(err=>{

        })
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