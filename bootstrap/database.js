const mongoose = require('mongoose');
const config = require('../config/index');

/**
 * 创建链接路径  ${}可直接解析config内容
 */
let uri = '';
if (config.mongodb.auth == true){
    //认证数据库
    uri = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`;
}else {
    //非认证数据库
    uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`;
}
/**
 * 数据库链接
 */
const db = mongoose.connect(uri).then(()=>{
    console.log('数据库链接成功！');
}).catch(err=>{
    console.log('数据库连接失败'+err);
});

module.exports = db;