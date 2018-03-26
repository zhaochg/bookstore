const UserModel=require('../models/user');
const md5=require('md5');
// 注册
const Regisder ={
    // 注册页面
    index:(req,res,next)=>{
        res.render('register',{title:'注册页面'});
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
        //邮箱是否重复
        if(email){
        UserModel.findOne({email:email}).then(doc=>{
            if(doc){
                req.flash('error','注册失败，邮箱已存在');
                res.redirect('/users/register');
            }else {
                if (password !== repassword) {
                    req.flash('error', '密码不一致');
                    res.redirect('/users/register');
                } else {
                    //注册操作
                    UserModel.create({
                        email: email,
                        nickname: nickname,
                        password: md5(password),
                        repassword: md5(repassword)
                    }).then(doc => {
                        req.flash('error', '注册成功');
                        res.redirect('/users/login');
                    }).catch(err => {
                        req.flash('error', '注册失败');
                        res.redirect('/register')

                    })
                }
            }
        }).catch(err=>{
            req.flash('err','注册失败');
            res.redirect('/register')
        })
      }
    }
};

module.exports=Regisder;
