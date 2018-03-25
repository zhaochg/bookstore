const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./book');
const User = require('./user');
/**
 *购物车模型
 */
const Shopping_carSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    book_id:{
        type:Schema.Types.ObjectId,
        ref:'Book'
    },
    num:{
      type:Number,
      default:1
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date,
        default:Date.now
    },
    delete_at:{
        type:Date,
        default:null
    },
});

const Shopping_car = mongoose.model('Shopping_car',Shopping_carSchema);
module.exports = Shopping_car;