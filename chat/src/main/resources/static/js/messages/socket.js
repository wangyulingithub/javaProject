var receiver = $('a[mark]').text();
var messages = {};
var $dataInfo = $('#data_info');
var $onlineFriend = $('ul.room_lists');
var friendList = new Array();
$.socketLink = function (sysUser, state) {
    var url = "http://192.168.0.109:9090/webSocket";
    var stomp = null;
    //连接
    var socket = new SockJS(url);
    stomp = Stomp.over(socket);
    stomp.connect('guest', 'guest', function (frame) {
        messages={
            "sysUser":sysUser,
            "receiver":receiver
        };
        stomp.send("/app/online", {}, JSON.stringify(messages));
        $.userOnline();
        $.userOffline();
        $.singleUserMessage();
        $.allUserMessage();
    }, function errorCallBack(error) {
        console.log("连接失败!!!");
    });
    //点击发送
    $(document).on("click", "#sendInfo", function () {
        var date = new Date().Format("yyyy-MM-dd HH:mm:ss");
        var input_info = $('input[type="text"]');
        var message = input_info.val();
        if (message !== "") {
            messages = {
                "sysUser": sysUser,
                "messageType": state,
                "message": message,
                "receiver": receiver,
                "sendDate": date
            };
            input_info.val('');
            //JSON 通常用于与服务端交换数据。
            //在向服务器发送数据时一般是字符串。
            sendMessage(messages, state)
        } else {
            confirm("信息为空!!");
        }
    });

    //发送消息
    function sendMessage(messages, state) {

        //表示向后端路径/chat发送消息请求，这个是在控制器中@MessageMapping中定义的
        if (state === 2) {
            stomp.send("/app/allChat", {}, JSON.stringify(messages));
        } else if(state === 1) {
            $dataInfo.append('<div class="message left_x w-75 ml-auto text-right">'
                + '<span>' + messages.sendDate + '</span>'
                + '<a class="float-right">'
                + '<img src='+messages.sysUser.headShot+' value=' + messages.sysUser.userId + ' class="img-fluid rounded-circle" alt="头像"></a>'
                + '<div class="alert alert-info mr-4 text-sm-center">' +
                messages.message
                + '</div></div>');
            stomp.send("/app/singleChat", {}, JSON.stringify(messages));//转成JSON字符串并发送
            $(".message")[$(".message").length - 1].scrollIntoView();
        }else {
            alert("无法发送！");
        }
    }

    //接受上线消息
    $.userOnline = function () {
        stomp.subscribe("/on/online", handel);

        function handel(sendMessage) {
            var obj = JSON.parse(sendMessage.body);

            if (obj.receiver===receiver&& obj.receiver.substring(0,3).trim()==="聊天室") {
                $dataInfo.append('<p class="online_m text-center" ' +
                    'style="user-select:none;color: #11ff18;font-style: italic;opacity: 0.8;">' + "欢迎" + obj.sysUser.username + '加入聊天室' + '</p>');

                $onlineFriend.append('<li class="list-group-item list-group-item-action w-100">'
                    + '<img src=' + obj.sysUser.headShot + ' value=' + obj.sysUser.userId + ' class="rounded-circle">'
                    + '<span>' + obj.sysUser.username + '</span></li>');

               /* $.get("/addSessionName",onlineUser=onlineUser);*/
               /* $.ajax({
                    type: "POST",
                    url: "/addSessionName",
                    success: function (data) {
                        $.each(data,function (index,value) {
                            alert(value.username);
                            /!*$onlineFriend.append('<li class="list-group-item list-group-item-action w-100">'
                                + '<img src=' + obj.sysUser.headShot + ' value=' + obj.sysUser.userId + ' class="rounded-circle">'
                                + '<span>' + obj.sysUser.username + '</span></li>');*!/
                        })
                    }
                })*/
               /* $.friendLists(obj.sysUser.headShot,obj.sysUser.username,obj.sysUser.userId);*/

            }
        }

        //接受下线消息
        $.userOffline = function () {
            stomp.subscribe("/topic/offline", handel);

            function handel(sendMessage) {
                var obj = JSON.parse(sendMessage.body);
                if (obj.receiver===receiver) {
                    $dataInfo.append('<p class="online_m text-center" ' +
                        'style="user-select:none;color: red;font-style: italic;opacity: 0.8;">' + obj.sysUser.username + '退出了聊天室' + '</p>');
                }
            }

            //接受or订阅指定用户
            $.singleUserMessage = function () {
                stomp.subscribe("/user/queue/dynamic", handleNotification);
                function handleNotification(message) {
                    $.webText(message);
                }
            };

            //接受or订阅群消息
            $.allUserMessage = function () {
                stomp.subscribe("/all/getResponse", handel);
                function handel(message) {
                    $.webText(message);
                }
            };

            //消息显示到页面
            $.webText = function (message) {
                var obj = JSON.parse(message.body);
                if (obj.messageType === 1 && receiver === obj.sysUser.username) {
                    $dataInfo.append('<div class="message right_x w-75 mr-auto">'
                        + '<span>' + obj.sendDate + '</span>'
                        + '<a class="float-left"><img src='+obj.sysUser.headShot+' value=' + obj.sysUser.userId + ' class="img-fluid rounded-circle" alt="头像"></a>'
                        + '<div class="alert alert-secondary ml-4 text-sm-center">' +
                        obj.message
                        + '</div></div>');
                } else if (obj.messageType === 2 && obj.receiver===receiver) {
                    if (obj.sysUser.username == username) {
                        $dataInfo.append('<div class="message left_x w-75 ml-auto text-right">'
                            + '<span>' + obj.sendDate + '</span>'
                            + '<a class="float-right">'
                            + '<img src='+obj.sysUser.headShot+' value=' + obj.sysUser.userId + ' class="img-fluid rounded-circle" alt="头像"></a>'
                            + '<div class="alert alert-info mr-4 text-sm-center">' +
                            obj.message
                            + '</div></div>');
                    } else {
                        $dataInfo.append('<div class="message right_x w-75 mr-auto">'
                            + '<span>' + obj.sendDate + '</span>'
                            + '<a class="float-left"><img value=' + obj.sysUser.userId + ' src='+obj.sysUser.headShot+' class="img-fluid rounded-circle" alt="头像"></a>'
                            + '<div class="alert alert-secondary ml-4 text-sm-center">' +
                            obj.message
                            + '</div></div>');
                    }
                }
                $(".message")[$(".message").length - 1].scrollIntoView();
            }
        };

        //监听窗口事件
        window.onbeforeunload = function () {
            $.closeWebSocket();
        };

        //强制关闭浏览器  调用websocket.close（）,进行正常关闭
        window.onunload = function () {
            $.closeWebSocket();
        };

        //关闭双通道
        $.closeWebSocket = function () {
            if (stomp !== null) {
                messages={
                    "sysUser":sysUser,
                    "receiver":receiver
                };
                stomp.send("/app/offline", {}, JSON.stringify(messages));
                stomp.disconnect();
                socket.close();
            }
        };
    };

    /*$.friendLists = function (imgUrl,username,userId) {

        if (friendList.length===0){
            friendList.push(username);
            $onlineFriend.append('<li class="list-group-item list-group-item-action w-100">'
                + '<img src=' + imgUrl + ' value=' + userId + ' class="rounded-circle">'
                + '<span>' + username + '</span></li>');
        }else {
            $.each(friendList, function (index, value) {
                if (value!=username){
                    $onlineFriend.append('<li class="list-group-item list-group-item-action w-100">'
                        + '<img src=' + imgUrl + ' value=' + value + ' class="rounded-circle">'
                        + '<span>' + value + '</span></li>');
                }
            });
        }

    };*/
};