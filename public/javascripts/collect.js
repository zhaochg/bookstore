$(function(){
    getCollectList();
});

var page = 1;
var key = '';
/*
* 获取列表
* */
function getCollectList() {
    $.get('/user', {page: page, key: key},function (data) {
        if (data.status == 1) {
            var articlelist = data.result;
            var html = ''
            for (var i = 0; i < articlelist.length; i++) {
                html+='<div class="col-sm-6 col-md-4" >'
                html+='<div class="thumbnail" >'
                html+='<img src="/uploads/'+ articlelist[i].img+ '" >'
                html+='<div class="caption">'
                html+=' <h3> '+ articlelist[i].title+ '</h3>'
                // html+='<p>'+articlelist[i].content+'</p>'
                html+='<span>時間：'+articlelist[i].create_at+'</span>'
                html+='<a href="#" onclick="deleteArticleList(\'' + articlelist[i]._id + '\')" class="btn btn-danger" role="button">'
                html+='<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> 删除</a>&nbsp;'
                html+='<a href="#" onclick="editArticleList(\'' + articlelist[i]._id + '\')"class="btn btn-primary" role="button"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a>'
                html+='</div>'
                html+='</div>'
                html+='</div>'
            }
            $("#articleList").html(html);
            //总页数
            var totalPage = data.totalPage;

            //总条数
            var count = data.count;
            //当前页码
            page = data.page;

            //每页显示条数
            var limit = data.limit;

            var pageHtml = "";

            $("#pageList").html('');


            if (totalPage > 1) {
                //分页
                if (page > 1) {
                    pageHtml += '<li><a href="javasctipt:;" onclick="setPage(' + (parseInt(page) - 1) + ')">上一页</a></li>';
                }

                for (var i = 1; i <= totalPage; i++) {
                    if (i == page) {
                        pageHtml += '<li class="active"><a href="#">' + i + '</a></li>';
                    } else {
                        pageHtml += '<li><a href="javascript::" onclick="setPage(' + i + ')">' + i + '</a></li>';
                    }

                }
                if (page < totalPage) {
                    pageHtml += '<li><a href="javascript:;" onclick="setPage(' + (parseInt(page) + 1) + ')">下一页</a></li>';
                }

                $("#pageList").html(pageHtml);

            }
        }
    })
}

/**
 * 设置分页
 * @param p
 */
function setPage(p) {
    page = p;
    getCollectList();
}

/*
* 保存分类
*
*/
function saveArticleList(){
    var id= $("#id").val();
    var name = $('#name').val();
    var path = $('#path').val();
    var sort = $('#sort').val();
    var pid = $('#pid').val();
    var template = $('#template').val();
    var is_nav = $('#is_nav').val();

    if(id){
        //    分类修改
        $.post("/category/update/"+id,{
            name:name,
            path:path,
            sort:sort,
            pid:pid,
            template:template,
            is_nav:is_nav
        },function(date){
            if(date.status == 1){

                $('#categoryModal').modal('hide');
                layer.msg("修改完成");
            }else{
                layer.msg(date.msg);
            }
            getCollectList();
        })
    }else{
        $.post('/category/save',{
            name:name,
            path:path,
            sort:sort,
            pid:pid,
            template:template,
            is_nav:is_nav
        },function(data){
            if(data.status == 1){

                $('#categoryModal').modal('hide');
                layer.msg('保存成功');

                getCollectList();
            }else{
                layer.msg(data.msg)
            }
        })
    }
}
/*
* 编辑分类
* */
function editArticleList(id){
    alert(id);
    $.get("/article/"+id,function(date){
        if(date.status ==1){
            alert(1111);
            console.log(date.result);
            var category = date.result;
            $("#id").val(category._id);
            $("#name").val(category.name);
            $("#path").val(category.path);
            $("#pid").val(category.pid);
            $("#sort").val(category.sort);
            $("#template").val(category.template);
            $("#is_nav").val(category.is_nav);

            $('#articleModal').modal("show");
        }else{
            alert(2222)

            layer.msg(date.msg)

        }
    })
}
/*
* 删除分类
* */
function deleteArticleList(id){
    layer.confirm('是否删除?',{
        btn:['是','否']
    },function(){
        $.post('/article/del/'+id,{},function(date){
            if(date.status == 1){
                layer.msg("刪除失敗");
                getCollectList();
            }else{
                layer.msg("刪除成功");
                getCollectList();
            }
        })
    })
}
