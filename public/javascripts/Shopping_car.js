/**
 * 购物车js功能实现
 */
$(function(){
    $("#checkedAll").click(function () {
        if ($(this).attr('checked')) {// 全选
            $("").each(function () {
                $(this).attr("checked", true);
            });
        }
        else { // 取消全选
            $("").each(function () {
                $(this).attr("checked", false);
            });
        }
    });
});

