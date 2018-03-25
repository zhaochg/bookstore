const UserModel=require('../models/user');
const md5=require('md5');
// 注册
const Regisder ={
    // 注册页面
    index:(req,res,next)=>{
        res.render('register');
    },

    regisder:(req,res,next)=>{
        /**
         * 注册用户
         */

        let email=req.body.email;
        let nickname=req.body.nickname;
        let password=req.body.password;
        let repassword=req.body.repassword;


        //注册操作
       UserModel.create({
           email: email,
           nickname: nickname,
           password: md5(password),
           repassword:md5(repassword)
       }).then(doc=>{
          req.flash('msg','注册成功');
           res.redirect('/users/login');
       }).catch(err=>{
            req.flash('err','注册失败');
           res.redirect('/register');

       })
        //登录操作

    },

}

module.exports=Regisder;
