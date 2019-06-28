const UserModel = require('../models/user');
const bookModel = require('../models/book');
const OrderModel = require('../models/order');
const AuthorModel = require('../models/author');
const md5=require('md5');

const admin = {
    index:(req,res,next)=>{
        res.render("admin",{

        })
    },
    get:(req,res,next)=>{
        let user = res.locals.loginUser;
        let shoppingCar = res.locals.shopping;
        // 书籍列表（分页）畅销与新书切换
        let news_List = '';
        let admin_user = ""
        let admin_order = ""
        let  count = 0;
        let  user_count = 0
        let  order_count = 0
        let  limit = 8;
        let  page=req.query.page?req.query.page:1;
        let  pagex=req.query.pagex?req.query.pagex:1;
        let  pageo=req.query.pageo?req.query.pageo:1;
        let  userPage = 0
        let totalPage = 0;
        let orderPage = 0
        let where = {};
        let alt = req.query.alt?req.query.pageo:1;
        //最新
        bookModel.find().count().then(doc => {
            // console.log('所有书籍'+doc);
            count = doc;
            totalPage=Math.ceil(count/limit);
            console.log(totalPage);

            UserModel.find().count().then(doc =>{
                user_count = doc
                userPage=Math.ceil(user_count/limit);
                UserModel.find().skip((page-1)*limit).limit(limit).sort({create_at:"desc"}).then(doc=>{
                    console.log("user",doc)
                    admin_user = doc
                    bookModel.find(where).populate("author_id").skip((pagex-1)*limit).limit(limit).sort({create_at:"desc"}).then(doc => {
                        news_List = doc;
                        console.log('所有书籍000'+doc);
                        OrderModel.find().count().then(doc =>{
                            order_count = doc
                            console.log("order",order_count)
                            orderPage=Math.ceil(order_count/limit);
                            OrderModel.find(where).populate("user_id").skip((pageo-1)*limit).limit(limit).then(doc =>{
                                console.log("订单数据",doc)
                                admin_order = doc
                                res.render('adminindex', {
                                    news_List:news_List,
                                    admin_user:admin_user,
                                    admin_order:admin_order,
                                    count:count,
                                    page:page,
                                    pagex:pagex,
                                    pageo:pageo,
                                    totalPage:totalPage,
                                    userPage:userPage,
                                    orderPage:orderPage,
                                    alt:alt,
                                    user:user,
                                    shoppingCar:shoppingCar
                                });
                            })
                        })

                    }).catch(err => {
                        console.log('查询熱销书籍失败'+ err);
                    });
                })
            })


        }).catch(err => {
            console.log('查询书籍失败'+ err);
        });
    },
    login:(req,res,next)=>{
        //邮箱
        //密码
        let email=req.body.email;
        let password=req.body.password;
        //登录验证
        if( email = "1105148155@qq.com"){
            UserModel.findOne({email:email}).then(doc=>{
                if(doc){
                    let user=doc;
                    if(user.password==md5(password)){
                        // req.session.loginUser=user;
                        // req.session.loginUser=user;
                        req.flash('error', '登录成功！');
                        res.redirect("/admin/index");
                    }else{
                        req.flash('error','密码错误');
                        res.redirect('/admin/login');
                    }
                }else{
                    req.flash('error','邮箱不存在');
                    res.redirect('/admin/login');
                }
            }).catch(err=>{
                console.log(err);
            })
        }

        // res.render("admin",{
        //
        // })
    },
    logout:(req,res,next)=>{
        req.session.destroy(err => {
            res.redirect('/admin/login');
        })
    },
    book_update:(req,res,next)=>{
        let book = {}
        let id =  req.body.id
        book.name = req.body.name;
        book.price = req.body.price;
        book.content = req.body.conent;
        bookModel.update({_id:id},book).then(doc => {
            console.log("updatedoc",doc)
            bookModel.find({_id:id}).populate('author_id').then(doc =>{
                res.json({
                    'status': 1,
                    'msg': '修改成功！',
                    "data":doc
                })
            })

        }).catch(err => {
            res.json({
                'status': 0,
                'msg': '修改失败！'
            })
        });
    },
    delete:(req,res,next)=>{
        let id =  req.body.id
        bookModel.remove({_id:id}).then(doc=>{
            res.json({
                'status': 1,
                'msg': '删除成功！',
            })
        })
    },
    create:(req,res,next)=>{
        let name = req.body.name;
        let price = req.body.price;
        let content = req.body.conent;
        let authorname = req.body.authon;
        let authorcontent = req.body.authon_conent
        AuthorModel.find({name:authorname}).then(doc=>{
            console.log("查找成功",doc)
            let list  = doc
            let id = list[0]._id
            console.log("作者id",id)
            bookModel.create({
                name:name,
                content:content,
                price:price,
                author_id:id
            }).then(doc=>{
                console.log("创建书籍成功",doc)
                res.json({
                    status:true,
                    msg:"创建成功!"
                })
            })
        }).catch(err=>{
            console.log("err",err)
            AuthorModel.create({
                name:authorname,
                content:authorcontent
            }).then(doc=>{
                console.log("创建作者成功",doc)

                let author_id = doc._id
                bookModel.create({
                    name:name,
                    content:content,
                    price:price,
                    author_id:author_id
                }).then(doc=>{
                    console.log("创建书籍成功",doc)
                    res.json({
                        status:true,
                        msg:"创建成功!"
                    })
                })

            })
        })

    }
}
module.exports = admin