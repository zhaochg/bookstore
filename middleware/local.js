/**
 * 全局Locals数据
 */
const Locals = (req,res,next) => {
    res.locals.error = req.flash('error');
    res.locals.loginUser = req.session.loginUser;
    next();
};
module.exports = Locals;