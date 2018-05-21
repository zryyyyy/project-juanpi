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
               this.allselect();
            }.bind(this));

           
            
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
                        var totalprice = item2.cprice*item1.num;                     
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
                                            <span class="yuan clear1"></span>
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
                                            <span class="jian">-</span>
                                            <span class="shuzi">${item1.num}</span>
                                            <span class="jia">+</span>
                                        </div>
                                        <div class="total pub">
                                            ￥<a>${totalprice}</a>
                                        </div>
                                        <div class="slice pub">
                                            <span class="shanchu"></span>
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
            var num = Number($(".shuzi").html());
            
         
           
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
                num++;
                $(this).prev().html(num);
                var shopcarstring = $.cookie("addcar")
                var shopcararray = JSON.parse(shopcarstring);
                $.each(shopcararray,function(index,item){
                  
                    item.num = num; 
                })
                 $.cookie("addcar", JSON.stringify(shopcararray));   
             })
            
        
          
           
        }
    }
})