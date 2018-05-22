 define(["banner", "indexcookie"], function() {
    $(function() {
      //列表;
      $(".banner_left dl dd").hover(function() {
          // console.log($(this));
          $(this.firstChild.firstChild).css("background-position-y", " -23px");
          $(this.firstChild).css("color", "#ff464e");
        }, function() {
          $(this.firstChild.firstChild).css("background-position-y", " 0px");
          $(this.firstChild).css("color", "#333");
        });

      //侧边栏、
      $(".normal").hover(function() {
          $(this.children[0].children[0]).css("background-position-x", " -26px");
          $(this.children[0].children[1]).css("background", " #fff");
          $(this.children[0].children[1]).css("color", " #ff464e");
          $(this).css("background", "#ff464e");
        }, function() {
          $(this.children[0].children[0]).css("background-position-x", " 0px");
          $(this.children[0].children[1]).css("background", " #ff464e");
          $(this.children[0].children[1]).css("color", " #fff");
          $(this).css("background", "#444");
        });

      //返回顶部
      $("body,html").on("mousewheel", function() {
        gettop();
      });
      function gettop() {
        if ($(document).scrollTop() > 0) {
          $(".i_backtop").css("display", "block");
        }
      }

      $(".side_backtop").click(function() {
        $("html,body").animate({ scrollTop: 0 }, 300);
      });

      //分页

      $(".page a").hover(function() {
          $(this).css({ background: "#ff464e", color: "#fff" });
        }, function() {
          $(this).css({ background: "#fff", color: "#919191" });
        });

      $(".log").click(function() {
        window.location.href = "login.html";
      });
      $(".reg").click(function() {
        window.location.href = "register.html";
      });

      if ($.cookie("statue")) {
        $(".logreg .log").text($.cookie("statue"));
        $(".logreg").find("a").eq(1).html("退出")
        $(".logreg").find("a").eq(1).css("color","#ff464e")
      }
      $(".shop a").click(function(){
        window.location.href = "shopcar.html";
      })
      $(".side_cart").click(function() {
        window.location.href = "shopcar.html";
      });
      $(".logreg").find("a").eq(1).click(function(){
        window.location.href = "login.html"
      })
    });

    //轮播图
    $(function() {
      $(".content").gpBanner(".banner", {
        navigation: {
          nextEl: ".arrow_next",
          prevEl: ".arrow_prev"
        },
        pagination: {
          el: ".adtap"
        },
        direction: "scroll",
        loop: true
      });
    });
  });