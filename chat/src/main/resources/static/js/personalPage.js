//监听窗口事件
$(function () {
    $(window).on('resize', function () {
        var clientW = $(window).width();
        if (clientW < 700) {
            $('#lg_section').addClass("w-100");
        } else {
            $('#lg_section').removeClass("w-100");
        }
    }).trigger('resize');
});

//上传图片
$(document).on('change', '#upload_picture', function () {
    var fileValue = $(this).val();  //input[file]中的value值
    var file = $(this)[0].files[0];
    var fileFormat = fileValue.substring(fileValue.lastIndexOf(".")).toLowerCase();
    if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
        toastr.error('上传错误,文件格式必须为：png/jpg/jpeg');
    } else {
        var formData = new FormData();
        formData.append("file", file);
        $.ajax({
            type: "POST",
            url: "/upload",
            contentType: false,    //不可缺
            processData: false,    //不可缺
            async: false,
            data: formData,
            success: function (newFile) {
                if ("成功" === newFile) {
                    toastr.success(newFile)
                    window.location.reload();
                }
                toastr.error(newFile);
            },
            error: function () {
                toastr.error("上传失败！");
            }

        });
    }
});

//发送消息
$(document).on('click', '.send_tm .send_m', function () {
    var cont_name = $(this).attr("username");
    var mark1 = 1;
    window.location.href = "/tooRoom?chooseName=" + cont_name + '&mark=' + mark1;
});

//添加好友
$(document).on('click', '.send_tm .send_t', function () {
    var userId = $("nav>h6").attr("value");
    var friendId = $("#lg_section>ul>li>span.friend_id").text();
    var friendName = $("#lg_section>ul>lia.friend_name").text();
    alert(userId + friendId + friendName);
    if ((userId !== null || userId !== "") && (friendId !== null || friendId !== "")) {
        $.ajax({
            type: "post",
            url: "/addFriend",
            data: {userId: userId, friendId: friendId, friendName: friendName},
            success: function (result) {
                if (result > 0) {
                    toastr.success("添加成功！");
                } else {
                    toastr.success("添加失败！");
                }
                location.reload();
            },
            error: function () {
                toastr.success("网页出错！");
            }
        })
    } else {
        toastr.success("无法获取用户信息！");
    }
});

//更改名称
$('#myModal>div>div>div>button.btn-outline-primary').on('click', function () {
    var userId = $("nav>h6").attr("value");
    var username = $('input[name="username"]').val();
    if (username != null || username != "") {
        if (confirm("您确定要修改登录名称吗？确定修改将重新登录系统！")) {
            $.ajax({
                type: "post",
                url: "/updateName",
                data: {username: username, userId: userId},
                success: function (e) {
                    if (e) {
                        alert("更改成功！")
                    } else {
                        alert("更改失败！")
                    }
                    location.reload();
                },
                error: function () {
                    alert("出现异常！")
                }
            })
        }
    }
});

//更改个性签名
$('#myModalTwo>div>div>div>button.btn-outline-primary').on('click', function () {
    var userId = $("nav>h6").attr("value");
    var signature = $('textarea').val();
    if (signature != null || signature != "") {
        $.ajax({
            type: "post",
            url: "/updateSignature",
            data: {signature: signature, userId: userId},
            success: function (e) {
                if (e > 0) {
                    alert("更改成功！")
                } else {
                    alert("更改失败！")
                }
                location.reload();
            },
            error: function () {
                alert("出现异常！")
            }
        })
    }
});