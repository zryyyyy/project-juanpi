$(function(){
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
              console.log($(".page a"));
              $(".page a").hover(function() {
                  $(this).css({"background":"#ff464e","color":"#fff"});
                }, function() {
                  $(this).css({"background":"#fff","color":"#919191"});
                });




              $.ajax({
                url: "script/goods.json",
                success: function(res) {
                  var jsdata = res.list;
                  console.log(jsdata);
                  var html = "";
                  $.each(jsdata, function(index, item) {
                    html += `<li id="${item.goods_id}">
                    <div class="list_goods buy">
                        <div class="goods_pic">
                            <div class="pic_img">
                                <a href="${item.target_url}">
                                    <img src="${
                                      item.pic_url
                                    }" alt="${item.title}" />
                                </a>
                            </div>
                        </div>
                        <div class="goods_price">
                            <span class="price_current">
                                <em>￥</em>
                                ${item.cprice}
                            </span>
                            <span class="des_other">
                                <span class="price_old">
                                    <em>￥</em>
                                    ${item.oprice}
                                </span>
                            </span>
                        </div>
                        <h3 class="goods_title">
                            <a href="${item.target_url}">${item.title}</a>
                            <span class="sold">上新</span>                                       
                        </h3>
                    </div>
                </li>  `;
                  });
                  $(".goods_list").append(html);
                  //分页
                },
                error: function(err) {
                  console.log(err);
                },
                method: "get"
              });


             $(".log").click(function(){
               window.location.href="login.html"
             })
             $(".reg").click(function() {
               window.location.href = "register.html";
             });
            
           if($.cookie("statue")){
             $(".logreg a").text($.cookie("statue"));
           }
  });