$(function(){
//获得文本框对象
    var t = $("#text_box");
//数量增加操作
    $("#add").click(function(){
        t.val(parseInt(t.val())+1)
        if (parseInt(t.val())!=1){
            $('#min').attr('disabled',false);
        }
        setTotal();
    })
//数量减少操作
    $("#min").click(function(){
        t.val(parseInt(t.val())-1);
        if (parseInt(t.val())==1){
            $('#min').attr('disabled',true);
        }
        setTotal();
    })
//计算操作
    function setTotal(){
        $("#total").html((parseInt(t.val())*3.95).toFixed(2));//toFixed()是保留小数点的函数很实用哦
    }
//初始化
    setTotal();
})