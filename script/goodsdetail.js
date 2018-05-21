define(["jquery","jquerycookie"],function(){
    $(function(){
        new addcar("script/goods.json")
    })
    function addcar(url){
        this.url = url;
        this.img = $(".tupian");
        this.title = $(".deal_wrap h1");
        this.cprice = $(".js_cprice");
        this.tab = $("#tab_title")
        console.log(this.cprice);
        this.oprice = $(".js_oprice");
        this.init();
    }
    addcar.prototype = { 
        constructor: addcar, 
        init() {
            this.loading().then(function(res) {
                this.jsdata = res.list;
                console.log(this.jsdata);
                this.render();
            }.bind(this));
            this.num = $(".shop em");
            this.rnum = $(".num");
            this.num.html(this.getnum());
            this.rnum.html(this.getnum());
            this.zrynum =Number( $("#goodsnum").val());
            $(".addcar_btn").on("click.addcookie", $.proxy(this.addcookie, this));
            $(".addcar_btn").on("click.changeNum", $.proxy(this.changeNum, this));
            $(".increase").on("click",function(){
             this.zrynum ++;
             
                $("#goodsnum").val(this.zrynum)
                if( $("#goodsnum").val()>=2){
                    $(".decrease").removeClass("no");  
                }
            }.bind(this))
             $(".decrease").on("click", function() {               
                 if ($("#goodsnum").val() <= 1) {
                   $(".decrease").addClass("no");
                   return 0;
                 }
                 this.zrynum--;
                 $("#goodsnum").val(this.zrynum);
               }.bind(this));
        },
        loading() {
        var opt = { url: this.url };
        return $.ajax(opt);
        },
       render() {
        this.jsdata.forEach(function(item) {
            if (item.goods_id == $.cookie("shopcar")) {
              console.log($.cookie("shopcar"));
              $(".addcar_btn").attr("data_id", $.cookie("shopcar"));
              this.img[0].src = item.pic_url;
              this.title.html(item.title);
              this.cprice.html(item.cprice);
              this.oprice.html(item.oprice);
              this.tab.html(item.title);
              var d = $("#d");
              var h = $("#h");
              var m = $("#m");
              var s = $("#s");
              function timedown(times) {
                var timer = null;
                timer = setInterval(function() {
                  this.start = item.start_time;
                  this.cha = times - this.start;
                  this.day = Math.floor(this.cha / 1000 / 3600 / 24) < 1 ? "0" + Math.floor(this.cha / 1000 / 3600 / 24) : Math.floor(this.cha / 1000 / 3600 / 24);
                  this.cha = this.cha - this.day * 1000 * 3600 * 24;
                  this.hour = Math.floor(this.cha / 1000 / 3600) < 10 ? "0" + Math.floor(this.cha / 1000 / 3600) : Math.floor(this.cha / 1000 / 3600);
                  this.cha = this.cha - this.hour * 1000 * 3600;
                  this.minute = Math.floor(this.cha / 1000 / 60) < 10 ? "0" + Math.floor(this.cha / 1000 / 60) : Math.floor(this.cha / 1000 / 60);
                  this.cha = this.cha - this.minute * 1000 * 60;
                  this.second = Math.floor(this.cha / 1000) < 10 ? "0" + Math.floor(this.cha / 1000) : Math.floor(this.cha / 1000);
                  d.html(this.day);
                  h.html(this.hour);
                  m.html(this.minute);
                  s.html(this.second);

                  times -= 1000;

                  if (this.day == 0) {
                    d.css({ color: "red", fontSize: "18px" });
                    h.css({ color: "red", fontSize: "18px" });
                    m.css({ color: "red", fontSize: "18px" });
                    s.css({ color: "red", fontSize: "18px" });
                  }
                  if (times == 0) {
                    clearInterval(timer);
                  }
                }, 1000);
              }
              timedown(item.end_time);
            }
          }.bind(this));
      }, 
      addcookie() {          
        var goodsid = $(".addcar_btn").attr("data_id");   
        if (!$.cookie("addcar")) {
          var shopcararray = [{ id: goodsid, num: Number($("#goodsnum").val()) }];
          $.cookie("addcar", JSON.stringify(shopcararray)); 
          return 0;
        }
        var shopcarstring = $.cookie("addcar");
        var shopcararray = JSON.parse(shopcarstring);
        var hasitem = false;       
        $.each(shopcararray, function(index, item) {            
          if (item.id == goodsid) {
            hasitem = true;           
            item.num += Number($("#goodsnum").val());
          }
        });
        if (!hasitem) {
          var item = { id: goodsid, num: Number($("#goodsnum").val()) };
          shopcararray.push(item);
        }
        $.cookie("addcar", JSON.stringify(shopcararray));        
      }, 
      changeNum() {
        this.num.html(this.getnum());
        this.rnum.html(this.getnum());
      },
      getnum(){
        var shopcarstring = $.cookie("addcar");

        if(shopcarstring){
            var shopcararray = JSON.parse(shopcarstring);
            var sum=0;
            $.each(shopcararray,function(index,item){
              sum += Number(item.num)
              
            })
            return sum;
        }
     
        return 0;
    }
}
})