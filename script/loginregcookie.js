// function setCookie(name,value,days){
//     var date = new Date();
//     var statues=false;
//     date.setTime(date.getTime()+(days*24*60*60*1000));
//     if(!getCookie(name)){
//         document.cookie = name+"="+escape(value)+";"+((days == null)? "" : "dates=" + date.toGMTString());
//         return true;
//     }else{
//         return false;
//     }
// }


// function getCookie(name){
//     if(document.cookie.length>0){
//         var start = document.cookie.indexOf(name+"=");
//         var end = -1;
//         if(start != -1){
//             start = start +name.length + 1;
//             end = document.cookie.indexOf(",",start);
//             if(end == -1){
//                 end = document.cookie.length;
//             }
//             return document.cookie.substring(start,end);
//         }
//     }
// }


// function setCookie(name, value, days) {
//     //     var date = new Date();
//     //   var statues=false;
//     //   date.setTime(date.getTime()+(days*24*60*60*1000));
//     //   if(!$.cookie(name)){
//     //       $.cookie = name+"="+escape(value)+";"+((days == null)? "" : "dates=" + date.toGMTString());
//     //       return true;
//     //   }else{
//     //       return false;
//     //   }
//     var d = new Date();
//     d.setTime(d.getTime()+days*60*1000*60)
//     $.cookie("name", "value", {path:"/", expires : d});
// }
// function getCookie(name){

// }


//注册

// function register(){
//     console.log(1)
//     var name = $("#user").val();
//     var password = $("#password").val();
//     if($.cookie("name","password",{expires:7})){
//         $("#user").val()="";
//        $("#password").val()="";
     
//         $("#confirm_password").val() = "";
//         alert("注册成功");
//     }else{
//         alert("注册失败"+"该用户已存在！");
//     }
// }



//登录

// function login(){
//     var name = document.getElementById("account").value;
//     var password = document.getElementById("pwd").value;
//     if(getCookie(name) == password){
//         alert("登陆成功");
//         document.getElementById("account").value="";
//         document.getElementById("pwd").value="";
//     }else{
//         alert("登陆失败"+"用户名或密码错误");
//     }
// }





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



