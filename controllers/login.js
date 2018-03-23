/**
 * 登录页
 */
const UserModel = require('../models/user');
const md5=require('md5');
const Login ={
    /**
     // 登录页
     **/
    index:(req,res,next)=>{
        res.render('login');

    },
    /**
     * 登录操作
     **/
    login:(req,res,next)=>{
        //邮箱
        //密码
       let email=req.body.email;
       let password=req.body.password;
        //登录验证
       UserModel.findOne({email:email}).then(doc=>{

           if(doc){
               let user=doc;
               if(user.password==md5(password)){
                    req.session.loginUser=user;
                   res.redirect('/');

               }else{
                   req.flash('error','密码错误');
                   res.redirect('/users/login');
               }
           }else{
               req.flash('error','邮箱不存在');
               res.redirect('/users/login');
            }
           }).catch(err=>{
               console.log(err);
       })

    },
    logout:(req,res,next)=>{
        req.session.destroy(err => {
            res.redirect('/users/login');
        })
    }

};

module.exports = Login;
