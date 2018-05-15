function setCookie(name,value,days){
    var date = new Date();
    date.setDate(date.getDate()+days);
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
    var name = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    if(setCookie(name,password,365)){
        document.getElementById("user").value="";
        document.getElementById("password").value="";
        alert("注册成功");
    }else{
        alert("注册失败"+"该用户已存在！");
    }
}


//登录

function login(){
    var name = document.getElementById("account").value;
    var password = document.getElementById("pwd").value;
    if(getCookie(name) == password){
        alert("登陆成功");
        document.getElementById("account").value="";
        document.getElementById("pwd").value="";

    }else{
        alert("登陆失败"+"用户名或密码错误");
    }
}





