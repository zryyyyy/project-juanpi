define(["jquery"],function(){
     //正则验证
            //用户名;
            var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/;
            $("#user").blur(function () {
                $("#user").css("border-color","red")
                var name = $(this).val();
                if (name != "") {
                    var matchResult = name.match(reg);
                    if (!matchResult) {
                        $(".user_error").show();
                        $(".user_error").text("用户名为中文、英文、数字但不包括下划线等符号");
                    } else {
                        $(".user_error").hide();
                         $("#user").css("border-color", "#c6c6c6")
                    }
                } else { 
                    $(".user_error").show();
                    $(".user_error").text("请输入用户名");
                }
            })
            $("#user").focus(function(){
                $(".user_error").hide();
                $("#user").css("border-color", "#c6c6c6")
            })

            //密码
            var pwdreg = /^[a-zA-Z]\w{5,17}$/;
            $("#password").blur(function(){           
                $("#password").css("border-color", "red");
                var pwd = $(this).val();
                if(pwd != ""){
                    var  matchResult = pwd.match(pwdreg);                
                    if(!matchResult){
                        $(".pwd_error").show();
                        $(".pwd_error").text("以字母开头，长度在6~18之间，只能包含字母、数字和下划线");
                    }else{
                        $(".pwd_error").hide();
                         $("#password").css("border-color", "#c6c6c6");
                    }
                }else{
                    $(".pwd_error").show();
                    $(".pwd_error").text("请输入密码");
                }
            })
            $("#password").focus(function(){
                $(".pwd_error").hide();
                $("#password").css("border-color", "#c6c6c6");
            })
            //确认密码
            $("#confirm_password").blur(function(){
                $("#confirm_password").css("border-color", "red");
                var againpwd = $(this).val();
                var beforepwd = $("#password").val();             
                if(againpwd == ""){    
                    $(".againpwd_error").show();
                    $(".againpwd_error").text("两次密码不相同！");
                }else if(againpwd != beforepwd){     
                    $(".againpwd_error").show();
                    $(".againpwd_error").text("两次密码不相同！");
                }else{
                      $("#confirm_password").css("border-color", "#c6c6c6");
                }
            })
            $("#confirm_password").focus(function(){
                $(".againpwd_error").hide();
                $("#confirm_password").css("border-color", "#c6c6c6");
            })   
})