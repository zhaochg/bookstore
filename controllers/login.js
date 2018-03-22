/**
 * 登录页
 */
const UserModel = require('../models/user');

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
       let email=req.boby.email;
       let password=req.body.pasword;
        //登录验证
       UserModel.findOne({email:email}).then(doc=>{
           if(doc){
               let user=doc;
               if(user.password==password){
                   req.session.loginUser=user;
                   res.redirect('/');
               }else{
                   req.flash('error','邮箱错误');
                   res.redirect('/users/login');
               }
           }else{
               req.flash('error','邮箱不存在');
               res.redirect('/users/login');
            }
           })

    },
    logout:(req,res,next)=>{
        req.session.destroy(err => {
            res.redirect('/users/login');
        })
    }

};

module.exports = Login;
