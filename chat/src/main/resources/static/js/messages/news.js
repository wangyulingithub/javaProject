var websocket = null;
var messages;
$.socketLink2 = function (username, state) {
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://192.168.2.161:9090/myWebSocket/" + username);
    } else {
        alert('当前浏览器不支持websocket');
    }

    //连接成功建立的回调方法
    websocket.onopen = function () {
        console.log("连接成功");
    }

    //连接关闭的回调方法
    websocket.onclose = function () {
        console.log("连接关闭...");
    }

    //连接发生错误的回调方法
    websocket.onerror = function () {
        console.log("连接错误...");
    };

    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    }

    //发送消息
    $(document).on("click", "#sendInfo", function () {
        var receiver = $('a[mark="1"]').text();
        console.log(receiver);
        var input_info = $('input[type="text"]');
        var message = input_info.val();
        if (message !== "") {
            messages = {
                "toUser": username,
                "messageType": state,
                "message": message,
                "receiver": receiver
            };

            input_info.val('');
            //JSON 通常用于与服务端交换数据。
            //在向服务器发送数据时一般是字符串。
            websocket.send(JSON.stringify(messages));    //转成JSON字符串并发送
            /*            if (websocket != null) {             //判断是否连接服务器
                            if (websocket.readyState === websocket.OPEN) {   //判断是否为断开连接状态
                                messages = {
                                    "username": username,
                                    "state": state,
                                    "message": message
                                };
                                //JSON 通常用于与服务端交换数据。
                                //在向服务器发送数据时一般是字符串。
                                websocket.send(JSON.stringify(messages));    //转成JSON字符串并发送
                            } else {
                                alert("连接已中断！！")
                            }
                        } else {
                            alert("未连接服务器！！")
                        }*/
        } else {
            confirm("信息为空!!");
        }
    })

    //接收到消息的回调方法
    websocket.onmessage = function (e) {
        console.log(e);
        var data = e.data;
        var obj = JSON.parse(data);
        /*  $.ajax({
              type: "post",
              data: {obj}
          });*/
        if (obj.messageType === 0) {
            if (state === 2) {
                $('#data_info').append('<p class="text-center" ' +
                    'style="user-select:none;color: #11ff18;font-style: italic;opacity: 0.8;">' + obj.toUser + '加入聊天室' + '</p>');
            } else if (obj.receiver !== username) {
                $('a[mark="1"]').append("在线");
            }
        } else if (obj.toUser == username) {
            $('#data_info').append('<div class="left_x w-50 ml-auto">'
                + '<a class="float-right">'
                + '<img src="/static/defaultImg/tou01.jpg" class="img-fluid rounded-circle" alt="头像"></a>'
                + '<div class="alert alert-info mr-4 text-sm-center">' +
                obj.message
                + '</div></div>');
        } else if (obj.messageType === 4) {
            $('#data_info').append('<p class="text-center" ' +
                'style="user-select:none;color: red;font-style: italic;opacity: 0.8;">' + obj.toUser + '退出聊天室' + '</p>');
        } else {
            $('#data_info').append('<div class="right_x w-50 mr-auto">'
                + '<a class="float-left"><img src="/static/defaultImg/tou01.jpg" class="img-fluid rounded-circle" alt="头像"></a>'
                + '<div class="alert alert-secondary ml-4 text-sm-center">' +
                obj.message
                + '</div></div>');
        }
    }

}
//绑定回车触键发送消息
$(document).keyup(function (e) {
    //点击回车触发
    if (e.keyCode === 13) {
        $('#sendInfo').click();
        /*$("#getSend").attr("disabl    ed",true);*/
    }
});
