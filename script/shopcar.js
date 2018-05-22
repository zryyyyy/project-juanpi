define(["jquery","jquerycookie"],function(){
    $(function() {
    new shopcarlist("script/goods.json", ".carttop");
    });
    function shopcarlist(url,select){
        this.url = url;
        this.main = $(select);
        if(!this.main)return;
        this.init();
    }
    shopcarlist.prototype = {
        constructor:shopcarlist,
        init(){
             this.count = 0;  
            this.loading()
            .then(function(res){
                this.jsdata = res.list;
                 console.log(this.jsdata)
                this.render();
              this.allselect()
            }.bind(this));
           
            if ($.cookie("statue")) {
                  $(".logreg .log").text($.cookie("statue"));
                  $(".logreg").find("a").eq(1).html("退出")
                  $(".logreg").find("a").eq(1).css("color","#ff464e")
                }
                  $(".side_cart").click(function() {
                  window.location.href = "shopcar.html";
                });
         
                $(".shop a").click(function(){
                  window.location.href = "shopcar.html";
                })
                 $(".logreg").find("a").eq(1).click(function(){
                    window.location.href = "login.html"
                })
        },
        loading() {
        var opt = { url: this.url };
        return $.ajax(opt);
        },
        render(){
            var html = "";
            
            var shopcarstring = $.cookie("addcar");
            var shopcararray = JSON.parse(shopcarstring);
            $.each(shopcararray,function(index1,item1){         
                $.each(this.jsdata,function(index2,item2){
                   
                    if(item1.id == item2.goods_id){
                        var totalprice = Math.floor(item2.cprice * item1.num);
                        this.count += totalprice*1;
                      
                       html += `<div class="listtop">
                                    <div class="yuanwrap">
                                        <span class="yuan clear1"></span>
                                    </div>
                                    <div class="kuadian">
                                        <img src="images/kua.png" alt="" class="kuaimg">跨店促销
                                    </div>
                                    <a class="manjian">购满99元，可减20元&nbsp;去凑单 >></a>
                                </div>
                                <div class="cargood">
                                    <div class="listwrap">
                                        <div class="selectwrap">
                                            <span class="yuan yuan1 clear1"></span>
                                        </div>
                                        <a href="">
                                            <img src="${item2.pic_url}" alt="" width="100" height="100" class="goodimg">
                                        </a>
                                        <div class="goodsmsg pub">
                                            <strong class="goodstitle">${item2.title}</strong>
                                            <span class="sizecolor"> M , 紫色</span>
                                        </div>
                                        <div class="price pub">
                                            ￥${item2.cprice}
                                            <i class="oprice">
                                                /￥ ${item2.oprice}
                                            </i>
                                        </div>
                                        <div class="goodsnum pub">
                                            <span class="jian" >-</span>
                                            <span class="shuzi" data_id="${item1.id}">${item1.num}</span>
                                            <span class="jia">+</span>
                                        </div>
                                        <div class="total pub">
                                            ￥<a>${totalprice}</a>
                                        </div>
                                        <div class="slice pub">
                                            <span class="shanchu" data_id="${item1.id}"></span>
                                        </div>
                                    </div>
                                </div>`;
                                 
                    }                     
                }.bind(this))              
                   
            }.bind(this))    
             $(".carttop").append(html);                
        },
        allselect(){
            var shopcarstring = $.cookie("addcar");
            var shopcararray = JSON.parse(shopcarstring);
            var sum = 0; 
            var sum2 =0;
          var goods = [];
            $.each(shopcararray,function(index,item){           
                sum += Number(item.num);                 
            })   
            $(".quanwrap span").click(function() {
                $(".yuan").toggleClass("check");
                if ($(".quanwrap span").hasClass("check")) {
                    $(".totalnum").html(sum); 
                    $(".totalmsg a").html(this.count);
                    if(this.count>=99){
                        $(".zongjia a").html(this.count-20);
                    }
                    
                }
                if (!$(".quanwrap span").hasClass("check")) {
                    $(".totalnum").html(sum2);
                    $(".totalmsg a").html(sum2);
                    $(".zongjia a").html(sum2);
                }
            }.bind(this)); 
            
             $(".jia").click(function(){
             var num = Number($(this).prev().html());
             if(num>=2){
                      $(".jian").css("cursor","pointer")
                      $(".jian").css("color","#666")
                }
                num++;
                $(this).prev().html(num);
                this.id = $(this).prev().attr("data_id");
                var id = this.id;
               console.log(this.id)
                var shopcarstring = $.cookie("addcar")
                var shopcararray = JSON.parse(shopcarstring);
                console.log(shopcararray)
                $.each(shopcararray,function(index,item){
                    console.log(this)
                  if(id == item.id){
                       item.num = num; 
                       console.log(id,item.id)
                  }
                    $.cookie("addcar", JSON.stringify(shopcararray));   
                })
                
            if (num >= 2) {
              $(".jian").css("cursor", "pointer");
              $(".jian").css("color", "#666");
            }
                 
             })
              $(".jian").click(function(){
             var num = Number($(this).next().html());
                if(num<=1){
                    $(".jian").css("cursor","not-allowed")
                    $(".jian").css("color","#333")
                    return 0;
                   
                }
                num--;
                $(this).next().html(num);
                this.id = $(this).next().attr("data_id");
                var id = this.id;            
                var shopcarstring = $.cookie("addcar")
                var shopcararray = JSON.parse(shopcarstring);              
                $.each(shopcararray,function(index,item){                 
                  if(id == item.id){
                       item.num = num;                    
                  }
                    $.cookie("addcar", JSON.stringify(shopcararray));   
                })
                 if (num <= 1) {
                   $(".jian").css("cursor", "not-allowed");
                   $(".jian").css("color", "#333");
                   return 0;
                 }        
             })
            $(".yuanwrap span").click(function(){
                $(this).toggleClass("check");
                
                $(this).closest('.listtop').next().find("div").eq(1).children().toggleClass("check")
                if($(this).hasClass("check")){
                    var count1 =$(this).closest(".listtop").next().find("div").eq(4).find("span").eq(1).html();
                    var tprice = $(this).closest(".listtop").next().find("div").eq(5).find("a").html();
                    console.log()
                    console.log($(".totalnum").html())
                    console.log(sum)
                    goods.push({num:count1,price:tprice})
                    var totalnum=0;
                    var totalprice = 0;
                    goods.forEach(function(item){
                        totalnum+=item.num*1;
                        totalprice+=item.price*1
                    })
                    $(".totalnum").html(totalnum);
                    $(".totalmsg a").html(totalprice);
                    $(".zongjia a").html(totalprice-20)                    
                }
                if(!$(this).hasClass("check")){
                    $(".totalnum").html(0);
                     $(".totalmsg a").html(0);
                     $(".zongjia a").html(0);
                }               
                console.log(goods)
            })      
            $(".selectwrap span").click(function(){
                $(this).toggleClass("check");
                
               $(this).closest(".cargood").prev().find("div").eq(0).children().toggleClass("check")
            })
            $(".shanchu").click(function(){
                this.id1 = $(this).attr("data_id")
                var id1 = this.id1;
                console.log(this.id1)
                var shopcarstring = $.cookie("addcar")
                var shopcararray = JSON.parse(shopcarstring);               
                $.each(shopcararray,function(index,item){
                 console.log(item)
                  if(id1 == item.id){
                     shopcararray.splice(item,1)                    
                  }
                     $.cookie("addcar", JSON.stringify(shopcararray));   
                })
                location.reload();
            })      
        }
    }
})