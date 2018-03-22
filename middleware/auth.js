module.exports=(req,res,next)=>{
    // 登录认证
    let user = req.session.loginUser;
    if (user) {
        next();
    }else {
        res.redirect('/login');
    }

};