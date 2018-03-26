const UserModel = require('../../models/user');
const fs = require("fs");
const md5=require('md5');

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
        let user = req.session.loginUser;
        user.nickname = req.body.nickname;
        user.sex = req.body.sex;
        user.avatar=req.body.avatar;
        user.phone=req.body.phone;
        user.ziwo=req.body.ziwo;
        let imgData = req.body.imgdata;
        let suffix = req.body.suffix;
        console.log(suffix);
        let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        //保存编码到缓冲区
        var dataBuffer = new Buffer(base64Data, 'base64');
        if (base64Data) {
            //将缓冲区写入到文件中
            let filename = Date.now()+suffix;
            console.log(suffix);
            console.log(Date.now());
            fs.writeFile("./public/uploads/" + filename, dataBuffer, function (err) {
                if (err) {
                    res.json({
                        'status': 0,
                        'msg': '修改失败！'
                    })
                } else {
                    user.avatar = filename;
                    console.log(filename);
                    UserModel.update({_id: user._id}, user).then(doc => {
                        res.json({
                            'status': 1,
                            'msg': '修改成功！'
                        })
                    }).catch(err => {
                        res.json({
                            'status': 0,
                            'msg': '修改失败！'
                        })
                    });
                }
            });
        } else {
            UserModel.update({_id: user._id}, user).then(doc => {
                res.json({
                    'status': 1,
                    'msg': '修改成功！'
                })
            }).catch(err => {
                res.json({
                    'status': 0,
                    'msg': '修改失败！'
                })
            });
        }
    },
    // 修改密码
    password:(req,res,next)=>{
       // 用户id
       //         旧密码
       //         确认密码
        let user = req.session.loginUser;

        if(req.body.password!=''){
            user.password = md5( req.body.password);
            UserModel.update({_id: user._id}, user).then(doc => {
                res.json({
                    'status': 1,
                    'msg': '修改成功！'
                })
            }).catch(err => {
                res.json({
                    'status': 0,
                    'msg': '修改失败！'
                })
            });
        }else {
            res.json({
                'status': 0,
                'msg':'输入不能为空！！'
            })
        }
    },
};

module.exports=User;