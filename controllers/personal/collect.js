<<<<<<< HEAD
const collectModel = require('../models/book');
// 收藏
const Collect = {
        // 列表
    index:(req,res,next) => {
        // 列表分页
    },
    //添加收藏
    add:(req,res,next) => {
        // 书籍id
    },
    // 删除
    delete:(req,res,next) => {
        //收藏id、书籍id、用户id
    },
};
    module.export =Collect;
=======
const CollectModel=require('../models/category');
/**
 * 收藏
 */
const Collect={
    /**
     * 收藏列表
     */
    index:(req,res,next)=>{
        //列表分页

    },
    /**
     * 添加收藏
     */
    add:(req,res,next)=>{
        //书籍id

    },
    /**
     * 删除收藏
     */
    delete:(req,res,next)=>{
        //收藏id/书籍id-用户id

    },
};
module.exports=Collect;
>>>>>>> 07fe7f41d09d13fb0a43004df1601b4712b779f7
