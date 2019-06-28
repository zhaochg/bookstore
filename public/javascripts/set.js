
function updateUser() {
    var nickname = $("#nickname").val();
    var sex =  $('input:radio:checked').val();
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
            // alert(data.msg);
            layer.msg(data.msg)
            $("#nickname").val(nickname);
             $('input:radio:checked').val(sex);
            $("#phone").val(phone);
             $("#ziwo").val(ziwo);
            $("#imgdata").val(imgdata);
            $("#suffix").val(suffix);

            $("#usernickname").html(nickname);
            if(sex == 1){
                $('#usersex').html("男");
            }else{
                $('#usersex').html("女");
            }

            $("#userphone").html(phone);
            $("#userziwo").html(ziwo);

        } else {
            alert(data.msg);
        }
    });
}
