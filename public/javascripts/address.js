$(function(){
    getAddressList();
});

var page = 1;
var key = '';
/*
* 获取列表
*/
function getAddressList() {
    $.get('/personal/address',function (data) {
        if (data.status == 1) {
            alert(data.result);
            var list = data.result;
            var html = ''
            for (var i = 0; i < list.length; i++) {
                html += "<tr>"
                html += "<td>" + list[i].name + "</td>";
                html += "<td>" + list[i].phone + "</td>";
                html += "<td>" + list[i].address + "</td>";
                if(list[i].address_default == 1){
                    html+= '<td style="color: red;">默认地址</td>'
                }else{
                    html += '<td style="color: green">不是默认地址</td>'
                }
                html += '<td><a href="javascript:;" class="btn-edit"  onclick="editAddressList(\'' + list[i]._id + '\')">编辑</a>';
                html += "</tr>"
            }
            $("#categoryList").html(html);
        }
    })
}
/*
* 清除
* */
function addAddressList(){
    $("#id").val('')
    $("#name").val('');
    $("#phone").val('');
    $("#address").val('');
    $("#default").val('');
}
/*
* 保存分类
*/

function saveAddressList(){
    var id= $("#id").val();
    var name = $('#name').val();
    var phone = $('#phone01').val();
    var address = $('#address01').val();
    var address_default = $('#address_default').val();

    if(id){
        //    分类修改
        $.post("/personal/updateAddress/"+id,{
            name:name,
            phone:phone,
            address:address,
            address_default:address_default
        },function(date){
            if(date.status == 1){
                $('#categoryModal').modal('hide');
                layer.msg("修改完成");
            }else{
                layer.msg(date.msg);
            }
            getAddressList();
        })
    }else{
        $.post('/personal/addAddress',{
            name:name,
            phone:phone,
            address:address,
            address_default:address_default,
        },function(data){
            if(data.status == 1){
                $('#categoryModal').modal('hide');
                layer.msg(data.msg);
                getAddressList();
            }else{
                layer.msg(data.msg)
            }
        })
    }
}
/*
* 编辑
* */
function editAddressList(id){
    $.get("/personal/"+id,function(date){
        if(date.status ==1){
            alert(1111);
            console.log(date.result);
            var category = date.result;
            $("#id").val(category._id);
            $("#name").val('');
            $("#phone").val('');
            $("#address").val('');
            $("#default").val('');
            $('#articleModal').modal("show");
        }else{
            alert(2222)

            layer.msg(date.msg)

        }
    })
}

/*
* 删除
* */
function deleteArticleList(id){
    layer.confirm('是否删除?',{
        btn:['是','否']
    },function(){
        $.post('/personal/del/'+id,{},function(date){
            if(date.status == 1){
                layer.msg("刪除失敗");
                getAddressList();
            }else{
                layer.msg("刪除成功");
                getAddressList();
            }
        })
    })
}
