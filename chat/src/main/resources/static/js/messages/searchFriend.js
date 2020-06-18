$(".search_friend").on('click',function () {
    var $searchFriend = $('.search_result');
    var username = $("input[type='text']").val();
    if (username.trim() != "") {
        $.ajax({
            type: "POST",
            url: "/toSearchFriend",
            data: {username: username},
            success: function (sysUser) {
                $searchFriend.html('<li class="list-group-item list-group-item-action w-100">'
                    + '<img src=' + sysUser.headShot + ' value=' + sysUser.userId + ' class="rounded-circle" style="height: 30px;width: 30px">'
                    + '<span>' + sysUser.username + '</span></li>');

            },
            error: function () {
                alert("搜索出错！");
            }
        });
    }
});
$(document).on('click', '.search_result>li', function () {
    //获取用户名称
    var friendId = $(this).children('img').attr("value");
    var userId = sysUser.userId;
    window.location.href = "/personal?friendId=" + friendId + '&userId=' + userId;
});