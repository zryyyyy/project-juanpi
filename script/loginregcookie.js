function setCookie(name,value,days){
    var date = new Date();
    var statues=false;
    date.setDate(date.getDate()+days*20000);
    if(!getCookie(name)){
        document.cookie = name+"="+escape(value)+";"+((days == null)? "" : "dates=" + date.toGMTString());
        return true;
    }else{
        return false;
    }
}


function getCookie(name){
    if(document.cookie.length>0){
        var start = document.cookie.indexOf(name+"=");
        var end = -1;
        if(start != -1){
            start = start +name.length + 1;
            end = document.cookie.indexOf(",",start);
            if(end == -1){
                end = document.cookie.length;
            }
            return document.cookie.substring(start,end);
        }
    }
}


//注册

function register(){
    console.log(1)
    var name = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    if(setCookie(name,password,365)){
        document.getElementById("user").value="";
        document.getElementById("password").value="";
     
         document.getElementById("confirm_password").value = "";
        alert("注册成功");
    }else{
        alert("注册失败"+"该用户已存在！");
    }
}



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



$(".login1").click(function(){
     var name = document.getElementById("account").value;
     var password = document.getElementById("pwd").value;
     
     if ($.cookie(name) == password) {
         if(!$.cookie("statue")){
             var statues = name;
             $.cookie("statue",statues);          
         }
       window.location.href="index.html"
       
     
       document.getElementById("account").value = "";
       document.getElementById("pwd").value = "";
     } else {
       alert("登陆失败" + "用户名或密码错误");
     }
})
$(".register1").click(function(){
   
    var name = document.getElementById("user").value;
    var password = document.getElementById("password").value;
     console.log(name , password );
    if(!name || !password){
        console.log(2)
        return false;
    }else if (setCookie(name, password, 365)) {
      document.getElementById("user").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirm_password").value = "";
      alert("注册成功");
    } else {
      alert("注册失败" + "该用户已存在！");
    }
})


$(".gologin").click(function(){
       window.location.href = "login.html";
})
$(".goregister").click(function () {
    window.location.href = "register.html";
})




