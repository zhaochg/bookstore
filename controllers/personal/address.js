const AddressModel = require('../../models/user');

const Address = {
    // 列表
    index:(req,res,next)=>{
        let user = res.locals.loginUser;
        let addresslist = [];
        AddressModel.findOne({_id:user._id}).then(doc => {
            addresslist = doc.address;
            res.json({
                status: 1,
                result: addresslist
            });
        }).catch(err => {
            console.log('获取地址列表失败'+err);
            res.json({
                status: 0,
                msg: '获取失败！'
            })
        });
    },
    // 添加地址
    add:(req,res,next)=>{
        let user = res.locals.loginUser;
        let name = req.body.name;
        let phone = req.body.phone;
        let address = req.body.address;
        console.log(user);
        let newaddress = {
            name:name,
            phone:phone,
            address:address
        };
        let addresslist = [];
        AddressModel.findOne({_id:user._id}).then(doc=>{
            addresslist = doc.address;
            addresslist.push(newaddress);
            AddressModel.update({_id:user._id},{address:addresslist}).then(doc=>{
                console.log('保存成功'+doc);
                res.json({
                    status:1,
                    msg:"保存成功"
                })
            }).catch(err=>{
                console.log('保存失败' + err);
                res.json({
                    status:0,
                    msg:"保存失败"
                })
            })
        }).catch(err=>{
            console.log('查无此人' + err);

        });


    },
    // 修改地址
    update:(res,req,next)=>{
        // id下标----------------------  user.addess
        // 姓名
        // 手机号
        // 地址
    },
    // 删除地址
    delete:(res,req,next)=>{

    },
};

module.exports = Address;