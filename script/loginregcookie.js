
define(["jquery","jquerycookie"],function(){
        $(".login1").click(function(){
            var name =$("#account").val();
            var password = $("#pwd").val();
            
            if ($.cookie(name) == password) {
                if(!$.cookie("statue")){
                    var statues = name;
                    
                    $.cookie("statue",statues);          
                }
             window.location.href="index.html"
            $("#account").val("");
            $("#pwd").val("");
            } else {
            alert("登陆失败" + "用户名或密码错误");
            }
        })
        console.log( $(".register1"))
        $(".register1").click(function(){
            var name = $("#user").val();
            var password = $("#password").val();
            var d = new Date();
            d.setTime(d.getTime() + 100*1000*60*60)
            console.log(name , password );
            if(!name || !password){ 
                return false;
            }else if($.cookie(name, password,{expires:d})) {
                   
            $("#user").val("");
            $("#password").val("")
            $("#confirm_password").val("")
             alert("注册成功");
            }else{
            alert("注册失败" + "该用户已存在！");
            }
        })
        $(".gologin").click(function(){
         
            window.location.href = "login.html";
        })
 
        $(".goregister").click(function(){ 
            window.location.href = "register.html";
        })  
})



