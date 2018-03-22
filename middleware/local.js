/**
 * 全局Locals数据
 */
const Locals = (req,res,next) => {
    req.locals.error = req.flash('error');
    req.locals.loginUser = req.session.loginUser;
    next();
};
module.exports = Locals;