// const userModel = require('../models/user');
// 用户信息
const User ={
    // 用户信息
    index:(req,res,next)=>{
        let user = req.session.loginUser;
        console.log(user);
        res.render('personal', {
            user: user
        });
    },
    // 修改个人信息
    save:(req,res,next)=>{
        //用户id
        // 昵称
        // 性别
        // 头像
        //手机号
    },
    // 修改密码
    password:(req,res,next)=>{
       // 用户id
       //         旧密码
       //         确认密码
    },
};

module.exports=User;