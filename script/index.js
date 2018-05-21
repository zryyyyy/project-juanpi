
  define(["banner","jquerycookie",],function(){
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
        $(".logreg a").text($.cookie("statue"));
      }
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



      
    $(function() {
       new shopcar("script/goods.json", ".goods_list");
    });
  
    function shopcar(url, select) {
      this.url = url;
      this.main = $(select);
      this.init();
    }
    shopcar.prototype = { 
        constructor: shopcar, 
        init() {
          this.loading()
          .then(function(res) {
              this.jsdata = res.list;
              this.render();
            }.bind(this));
          this.num = $(".shop em");
          this.rnum = $(".num");
          // this.num.html(this.getnum());
          // this.rnum.html(this.getnum());
            this.main.on("click","li[data_id]",$.proxy(this.addcookie,this));
            
            // this.main.on("click.changeNum", "li[data_id]", $.proxy(this.changeNum, this));
        }, 
        loading() {
          var opt = { url: this.url };
          return $.ajax(opt);
        }, 
        render() {
          var html = "";
          $.each(this.jsdata, function(index, item) {
            html += `<li data_id="${item.goods_id}">
                      <div class="list_goods buy">
                          <div class="goods_pic"  data_id="${item.goods_id}">
                              <div class="pic_img"  data_id="${item.goods_id}">
                                  <a data_id="${item.goods_id}">
                                      <img data_id="${item.goods_id}" src="${item.pic_url}" alt="${item.title}" />
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
                          <h3 class="goods_title"  data_id="${item.goods_id}">
                              <a>${item.title}</a>
                              <span class="sold">上新</span>                                       
                          </h3>
                      </div>
                  </li>  `;
          }.bind(this));
          this.main.html(html);
        },
        addcookie(event){
            var target = event.target|| event.srcElement;
            var goodsid = $(target).attr("data_id");
            $.cookie("shopcar",goodsid);
            window.location.href = "http://localhost/juanpi/gooddetail.html";
            
            // if(!$.cookie("shopcar")){
            //     var shopcararray = [{
            //         id:goodsid,
            //           // num :1
            //     }]
              
            //   $.cookie("shopcar",JSON.stringify(shopcararray));
            
            // }

        //     var shopcarstring = $.cookie("shopcar");
        //     var shopcararray = JSON.parse(shopcarstring);

        //     var hasitem = false;
        //     $.each(shopcararray,function(index,item){
   
        //       if(item.id == goodsid){
        //         hasitem=true;
          
        //         // item.num++;
        //       }
        //     })
        //     if(!hasitem){
        //       console.log(1);
        //       var item = [
        //         {
        //           id:goodsid,
        //           // num:1
        //         }
        //       ]
        //       shopcararray.push(item)
        //     }
        //   $.cookie("shopcar",JSON.stringify(shopcararray))
        // },
        // changeNum(){
        //    this.num.html(this.getnum());
        //    this.rnum.html(this.getnum());
        // },
        
        // getnum(){
        //   var shopcarstring = $.cookie("shopcar");
          
        //   if(shopcarstring){
        //       var shopcararray = JSON.parse(shopcarstring);
      
        //       var sum=0;
        //       $.each(shopcararray,function(index,item){
        //         sum += Number(item.num)
        //       })
        //       return sum;
        //   }
        //   return 0;
       
         
    }
  }

  })