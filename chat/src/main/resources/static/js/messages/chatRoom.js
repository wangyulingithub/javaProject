$(function () {
    $(window).on('resize', function () {
        var clientW = $(window).width();
        if (clientW < 768) {
            $('.row .room_nei').addClass("w-100");
            $('.row .room_nei').removeClass("w-50");
            $('ul.room_list').addClass("w-50");
            $('ul.room_list').removeClass("w-25");
        } else {
            $('.row .room_nei').removeClass("w-100");
            $('.row .room_nei').addClass("w-50");
            $('ul.room_list').removeClass("w-50");
            $('ul.room_list').addClass("w-25");

        }
    }).trigger('resize');

    /*************************点击查看聊天室成员事件*****************************/
    $('#list_number').on('click', function () {
        var drop = $("#room_nav .container .nav>li .room_list");
        drop.toggle();
    })
});

//获取当前时间
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//绑定回车触键发送消息
$(document).keyup(function (e) {
    //点击回车触发
    if (e.keyCode === 13) {
        $('#sendInfo').click();
        /*$("#getSend").attr("disabl    ed",true);*/
    }
});

//隐藏上下线的文字
$.hintTime = function () {
    var hint = $('.online_m');
    if (hint !== undefined) {
        $(".online_m").animate({
            "opacity": "0"
        }, 1000).hide(3000);
    }
};
setInterval($.hintTime, 10000);

//点击聊天室的好友事件
$(document).on('click','.room_lists li,#data_info>div>a',function () {
   //获取用户名称
   var friendId = $(this).children('img').attr("value");
   var userId = sysUser.userId;
    window.location.href="/personal?friendId="+friendId+'&userId='+userId;
});


var  receiver = $('a[mark]').text();
var $dataInfo = $('#data_info');
//查看单人聊天记录
$(document).on('click','.single_records',function () {
    var toUerName = sysUser.username;
    $.ajax({
        type: "POST",
        url: "/queryRecords",
        data: {toUser:toUerName,receiver:receiver},
        success:function (sendMessages) {
            $.each(sendMessages,function (index,sendMessage) {
                if (sendMessage.toUser === username) {
                    $dataInfo.append('<div class="message left_x w-75 ml-auto text-right">'
                        + '<span>' + sendMessage.sendDate + '</span>'
                        + '<a class="float-right">'
                        + '<img src=' + sendMessage.sysUser.headShot + ' value=' + sendMessage.sysUser.userId + ' class="img-fluid rounded-circle" alt="头像"></a>'
                        + '<div class="alert alert-info mr-4 text-sm-center">' +
                        sendMessage.message
                        + '</div></div>');
                }else {
                    $dataInfo.append('<div class="message right_x w-75 mr-auto">'
                        + '<span>' + sendMessage.sendDate + '</span>'
                        + '<a class="float-left"><img value=' + sendMessage.sysUser.userId + ' src='+sendMessage.sysUser.headShot+' class="img-fluid rounded-circle" alt="头像"></a>'
                        + '<div class="alert alert-secondary ml-4 text-sm-center">' +
                        sendMessage.message
                        + '</div></div>');
                }
            });
        },
        error: function () {
            alert("查询错误！");
        }
    })
});

//查看群聊天记录
$('.all_records').on('click',function () {

    $.ajax({
        type: "POST",
        url: "/allRecords",
        data: {receiver:receiver},
        success: function (data) {
            $.each(data,function (index,value) {
                if (value.toUser === username) {
                    $dataInfo.append('<div class="message left_x w-75 ml-auto text-right">'
                        + '<span>' + value.sendDate + '</span>'
                        + '<a class="float-right">'
                        + '<img src=' + value.sysUser.headShot + ' value=' + value.sysUser.userId + ' class="img-fluid rounded-circle" alt="头像"></a>'
                        + '<div class="alert alert-info mr-4 text-sm-center">' +
                        value.message
                        + '</div></div>');
                }else {
                    $dataInfo.append('<div class="message right_x w-75 mr-auto">'
                        + '<span>' + value.sendDate + '</span>'
                        + '<a class="float-left"><img value=' + value.sysUser.userId + ' src='+value.sysUser.headShot+' class="img-fluid rounded-circle" alt="头像"></a>'
                        + '<div class="alert alert-secondary ml-4 text-sm-center">' +
                        value.message
                        + '</div></div>');
                }
            })
        },
        error: function () {
            alert("查询错误！");
        }
    })

});