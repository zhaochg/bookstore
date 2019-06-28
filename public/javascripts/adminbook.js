function updateUser(id) {
    var bookname = $("#"+id+"_bookname").val();
    var price = $("#"+id+"_price").val();
    var conent = $("#"+id+"_conent").val();

    console.log("html", $("#"+id+"_bookprice").html())


    $.post('/admin/book_update', {
        name: bookname,
        price: price,
        conent: conent,
        id:id
    }, function (data) {
        if (data.status == 1) {
            layer.msg(data.msg);
            console.log("Date",data.data[0])
            $("#"+id+"_name").html(data.data[0].name.substr(0,5))
            $("#"+id+"_content").html(data.data[0].content.substr(0,10))
            $("#"+id+"_bookprice").html("￥"+data.data[0].price)

            $("#"+id+"_bookname").val(data.data[0].name);
            $("#"+id+"_price").val(data.data[0].price);
            $("#"+id+"_conent").val(data.data[0].content);
        } else {
            layer.msg(data.msg);
        }
    });
}
function del(id){
    $.post("/admin/delete",{
        id:id
    },function(data){
        console.log("删除成功!")
        layer.msg(data.msg)
        $("#"+id+"_dail").remove()
    })
}
function create(){
    let bookname = $("#bookname").val()
    let authon = $("#authon").val()
    let price = $("#price").val()
    let authon_conent = $("#authon_conent").val()
    let conent = $("#conent").val()
    $.post("/admin/create",{
        name:bookname,
        authon:authon,
        price:price,
        conent:conent,
        authon_conent:authon_conent
    },function(data){
        location.reload()
    })
}