
function updateUser() {
    var nickname = $("#nickname").val();
    var sex = $("#sex").val();
    var phone = $("#phone").val();
    var ziwo = $("#ziwo").val();
    var imgdata = $("#imgdata").val();
    var suffix = $("#suffix").val();

    $.post('/personal/personal', {
        nickname: nickname,
        sex: sex,
        phone: phone,
        ziwo: ziwo,
        imgdata: imgdata,
        suffix:suffix,
    }, function (data) {
        if (data.status == 1) {
            alert(data.msg);
        } else {
            alert(data.msg);
        }
    });
}
