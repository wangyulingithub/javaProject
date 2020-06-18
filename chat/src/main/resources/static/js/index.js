var zone_display = $("#lk_section .container .row");
$(function () {
    var center_c = $('#lk_section .container .row >div');
    $(window).on('resize', function () {
        var leftW = document.querySelector("#lk_section .container .row .lef").offsetLeft;//获取元素到左侧的宽度
        var clientW = $(window).width();//获取窗口的宽度
        var headW = $(window).height();//获取Header元素的高度
        var navW = $('nav').height();
        var inputW = $('.lk-input').height();
        /*************************头像下拉选项距离左边的位置*****************************/
        $(".install").css("left", leftW);

        /*************************判断中间部分的边框情况*****************************/
        if (clientW > 753) {
            center_c.css("border-left", "1px solid #D8D8D8");
        } else {
            center_c.css("border-left", 0);
        }
        /*************************导航固定及中部内容显示*****************************/
        //中间内容的高度
        zone_display.css("height",headW-navW-39);

        //消息的高度
        $('.nav_chat').css("height",headW-navW-40-inputW)
        /* if (headW < 200) {
            $('section').css("padding-top", dW);
            $('nav').addClass("fixed-top");
        } else {
            $('section').css("padding-top", 0);
            $('nav').removeClass("fixed-top");
        }*/


    }).trigger('resize');

});
/*************************头像下拉选项点击事件*****************************/
$('#personal').on('click', function () {
    var drop = $(".install");
    drop.toggle();
});

//个人信息
$('#personal>a.top_picture>img.personal_data').on('click', function () {
    var userId = sysUser.userId;
    var friendId = userId;
    window.location.href="/personal?friendId="+friendId+'&userId='+userId;
    /*$(location).attr('href', '/personal')*/
});


/*************************点击进入聊天室事件*****************************/
var room_click = $("#lk_section .container .row .lef .card #collapseOne>ul>li>button");
room_click.on('click', function () {
    var room_name = $(this).siblings().text();
    var mark2 = 2;
    $.myChoose(room_name, mark2);
    /*if (zone_display.is(":hidden")) {*/       //判断中间内容是否隐藏
    /*    } else {
            $.ajax({
                type: "post",
                url: "/toRoom",
                data: {roomName: room_name},
                success: function (data) {
                    $("#room_name").text(data);
                }
            });
        }*/
});


/*************************点击好友事件*****************************/

var hao_click = $("#lk_section .container .row .lef .card #collapseTwo .card-body>ul>li");
hao_click.on('dblclick', function () {
    var cont_name = $(this).children('span').text();
    var mark1 = 1;
    $.myChoose(cont_name, mark1);
});

$(document).on('click','#collapseTwo>div>ul>li>img',function () {
    //获取用户名称
    var friendId = $(this).attr("value");
    var userId = sysUser.userId;
    window.location.href="/personal?friendId="+friendId+'&userId='+userId;
});


/*************************点击消息事件*****************************/

/*var newsB = $("#lk_nav .container .nav>li.i2");
var newsC = $("#lk_nav .container .nav>li.i1");
$(document).on('click',newsB, newsC,function () {
    if(newsB){
        $("#friend-left").addClass("d-none");
        $("#info-left").removeClass("d-none");
    }else if(newsC){
        $("#info-left").addClass("d-none");
        $("#friend-left").removeClass("d-none");
    }
})*/

$.myChoose = function (choose_name, mark) {
    window.location.href = "/tooRoom?chooseName=" + choose_name + '&mark=' + mark;

};

/*************************发送消息给机器人*****************************/
$(document).on('click','.lk-input>div>span.bg-success',function () {
    var date = new Date().FormatData("yyyy-MM-dd HH:mm:ss");
    var $message = $(".zone div.nav_chat");
    var content = $('.lk-input input[type="text"]').val();
    /*var $clientIp = $('#room_name').text();*/
    var rightMessage = $('<div class="left_x w-50 ml-auto border-info message text-right">'
        + '<span>' + date + '</span>'
        +'<a class="float-right"><img src='+sysUser.headShot+' width="30" height="30"'
        +'class="img-fluid rounded-circle" alt="头像"></a><div class="alert alert-danger mr-4">'+content+'</div></div>');
    $message.append(rightMessage);
    $(".message")[$(".message").length - 1].scrollIntoView();
    $('.lk-input input[type="text"]').val('');
    $.ajax({
        type: "post",
        url: "/sendToRobot",
        data: {sendContent: content},
        success: function (result) {
            var date = new Date().FormatData("yyyy-MM-dd HH:mm:ss");
            var leftMessage =$('<div class="right_x w-50 mr-auto message\">'
                + '<span>' + date + '</span>'
                +'<a class="float-left"><img src="defaultImg/tou01.jpg" width="30" height="30"'
                +'class="img-fluid rounded-circle" alt="头像"></a>'
                +'<div class="alert alert-info ml-4">'+result+'</div></div>');

            $message.append(leftMessage);
            $(".message")[$(".message").length - 1].scrollIntoView();
        },
        error: function () {
            alert("发送错误！")
        }
    })
});

//绑定回车触键发送消息
$(document).keyup(function (e) {
    //点击回车触发
    if (e.keyCode === 13) {
        $('.lk-input>div>span.bg-success').click();
        /*$("#getSend").attr("disabl    ed",true);*/
    }
});


//获取当前时间
Date.prototype.FormatData = function(nyr) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(nyr)) nyr = nyr.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(nyr)) nyr = nyr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return nyr;
};
