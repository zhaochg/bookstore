
function updateUser1() {

    var password  = $("#password").val();

    $.post('/personal/password', {
        password:password,
    }, function (data) {
        if (data.status == 1) {
            alert(data.msg);
        } else {
            alert(data.msg);
        }
    });
}
