
var $inputName = $("input[name='username']");
var $errorName = $('#error_name');
var $errorPassword = $('#error_password');
var $error_rePassword = $("#error_rePassword");
   /* $("button[type='submit']").on('click', function (e) {
        e.preventDefault();
        var userName = $("input[name='username']").val();
        var userPassword = $("input[name='password']").val();
        var rePassword = $("input[name='rePassword']").val();
        var sex = $("input[name='sex']:checked").val();
        if (userName.trim() !== "" && userPassword.trim() !== "") {
            if (rePassword.trim() === userPassword.trim()) {
                if ((rePassword.length>5&&rePassword.length<12)&&(userPassword.length>5&&userPassword.length<12)){
                    $.ajax({
                        type: "GET",
                        data: {username: userName, password: userPassword, sex: sex},
                        url: "/add",
                        success: function (data) {
                            if (data > 0) {
                                alert("注册成功！")
                            }
                        },
                        error: function () {
                            alert("错误！")
                        }
                    });
                }else if (rePassword.length<=5 || rePassword.length>=12){
                    $("input[name='rePassword']").css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                    $error_rePassword.html("<i class='text-danger'>密码位数应在5位到12之间&times;</i>");
                }else if (userPassword.length<=5 || userPassword.length>=12){
                    $("input[name='password']").css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                    $errorPassword.html("<i class='text-danger'>密码位数应在5位到12之间&times;</i>");
                }
            }else {
                $("input[name='password']").css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                $errorPassword.html("<i class='text-danger'>密码不一致&times;</i>");
                $("input[name='rePassword']").css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                $error_rePassword.html("<i class='text-danger'>密码不一致&times;</i>");
            }
        }else if (userName.trim() === ""){
            $inputName.css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
            $errorName.html("<i class='text-danger'>用户不能为空&times;</i>");
        }else if (userPassword.trim() === ""){
            $("input[name='password']").css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
            $errorPassword.html("<i class='text-danger'>密码不能为空&times;</i>");
        }
    });*/

    //用户核对
    $("input[name='username']").change(function () {
        var userName = $("input[name='username']").val();
        if (userName.trim() !== "") {
            $.ajax({
                type: "POST",
                data: {username: userName},
                url: "/addQueryName",
                success: function (result) {
                    if (result) {
                        $inputName.css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                        $errorName.html("<i class='text-danger'>用户名重复&times;</i>");
                    } else {
                        $inputName.css({"border": "1px solid green","box-shadow": ""});
                        $errorName.html("<i class='text-success'>用户可用&radic;</i>");
                    }
                },
                error: function () {
                    alert("错误！")
                }
            });
        }else {
            $inputName.css({"border": "","box-shadow": ""});
            $errorName.html("");
        }
    });

    //密码验证
    $("input[name='password']").change(function () {
        var passwordL = $(this).val().length;
        if ($(this).val().trim()!==""){
            if (passwordL>5&&passwordL<=12){
                $(this).css({"border": "1px solid green","box-shadow": ""});
                $errorPassword.html("<i class='text-success'>第一次密码&radic;</i>");
            }else if (passwordL<=5){
                $(this).css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                $errorPassword.html("<i class='text-danger'>密码小于5&times;</i>");
            }else if (passwordL>12){
                $(this).css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                $errorPassword.html("<i class='text-danger'>密码大于12&times;</i>");
            }
        }else {
            $(this).css({"border": "","box-shadow": ""});
            $errorPassword.html("");
        }
    });

    //重复密码验证
    $("input[name='rePassword']").change(function () {
        var password = $("input[name='password']").val()
        var rePassword = $(this).val();
        var rePasswordL = $(this).val().length;
        if (rePassword.trim()!==""){

            if (rePasswordL>=5&&rePasswordL<=12){
                if (password===rePassword){
                    $(this).css({"border": "1px solid green","box-shadow": ""});
                    $error_rePassword.html("<i class='text-success'>第二次密码&radic;</i>");
                }else {
                    $(this).css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                    $error_rePassword.html("<i class='text-danger'>密码不一致&times;</i>");
                }
            }else if (rePasswordL<5){
                $(this).css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                $error_rePassword.html("<i class='text-danger'>重复密码小于5&times;</i>");
            }else if (rePasswordL>12){
                $(this).css({"border": "1px solid red","box-shadow": "red 0px 0px 4px"});
                $error_rePassword.html("<i class='text-danger'>重复密码小于5&times;</i>");
            }
        }else {
            $(this).css({"border": "","box-shadow": ""});
            $error_rePassword.html("");
        }
    });


    $(function () {
        $("#myModal").modal('show')
    });