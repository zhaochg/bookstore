const AddressModel = require('../../models/user');
const Address = {
    // 获取地址列表
    index: (req, res, next) => {
        let user = res.locals.loginUser;
        let addresslist = [];
        AddressModel.findOne({_id: user._id}).then(doc => {
            addresslist = doc.address;
            res.json({
                status: 1,
                result: addresslist
            });
        }).catch(err => {
            console.log('获取地址列表失败' + err);
            res.json({
                status: 0,
                msg: '获取失败！'
            })
        });
    },
    // 添加地址
    add: (req, res, next) => {
        let user = res.locals.loginUser;
        let name = req.body.name;
        let phone = req.body.phone;
        let address = req.body.address;
        console.log(user);
        let newaddress = {
            name: name,
            phone: phone,
            address: address
        };
        let addresslist = [];
        AddressModel.findOne({_id: user._id}).then(doc => {
            addresslist = doc.address;
            addresslist.push(newaddress);
            AddressModel.update({_id: user._id}, {address: addresslist}).then(doc => {
                console.log('保存成功' + doc);
                res.json({
                    status: 1,
                    msg: "保存成功"
                })
            }).catch(err => {
                console.log('保存失败' + err);
                res.json({
                    status: 0,
                    msg: "保存失败"
                })
            })
        }).catch(err => {
            console.log('查无此人' + err);
        })
    },
//先获取后编辑
    get:(req, res, next) => {
        let user = res.locals.loginUser;
        let addresslistxiu  =[];
        AddressModel.findOne({_id : user._id}).then(doc => {
            addresslistxiu = doc.address;
            AddressModel.update({_id: user._id}, {address: addresslistxiu}).then(doc => {
                console.log('获取成功' + doc);
                res.json({
                    status: 1,
                    msg: "获取成功",
                    result:addresslistxiu,
                })
            }).catch(err => {
                console.log('获取失败' + err);
                res.json({
                    status: 0,
                    msg: "获取失败"
                })
            })
        }).catch(err => {
            console.log('查不到该用户' + err);
        })
    },
    update: (req, res, next) => {
        let user = res.locals.loginUser;
        let name = req.body.name;
        let phone = req.body.phone;
        let address = req.body.address;
        let xiabiao = req.params.xiabiao;
        let newaddress = {
            name: name,
            phone: phone,
            address: address
        };
        console.log(newaddress);
        console.log(xiabiao);
        let addresslist = [];
        AddressModel.findOne({_id: user._id}).then(doc => {
            addresslist = doc.address;
            for(let n=0;n<addresslist.length;n++){
                if(n == xiabiao ){
                    addresslist[n] = newaddress;
                }
            }
            AddressModel.update({_id: user._id}, {address: addresslist}).then(doc => {
                console.log('保存成功' + doc);
                res.json({
                    status: 1,
                    msg: "保存成功"
                })
            }).catch(err => {
                console.log('保存失败' + err);
                res.json({
                    status: 0,
                    msg: "保存失败"
                })
            })
        }).catch(err => {
            console.log('查无此人' + err);
        })
    },
    del: (req, res, next) => {
        let user = res.locals.loginUser;
        let xiabiao = req.params.xiabiao;
        console.log(xiabiao);
        let addresslist_shan  =[];
        AddressModel.findOne({_id : user._id}).then(doc => {
            addresslist_shan = doc.address;
            addresslist_shan.splice(xiabiao,1);
            AddressModel.update({_id: user._id}, {address: addresslist_shan}).then(doc => {
                console.log('删除成功');
                console.log(doc);
                res.json({
                    status: 1,
                    msg: "删除成功"
                })
            }).catch(err => {
                console.log('删除失败' + err);
                res.json({
                    status: 0,
                    msg: "删除失败"
                })
            })
        }).catch(err => {
            console.log('删除失败' + err);
        })
    },
};
module.exports=Address;