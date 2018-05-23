define(["jquery","jquerycookie"],function(){
    $(function() {
        new shopcar("script/goods.json", ".goods_list");
        });
  
    function shopcar(url, select) {
      this.url = url;
      this.main = $(select);
      if(!this.main)return ;
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
        this.num.html(this.getnum());
        this.rnum.html(this.getnum());      
        this.main.on("click", "li[data_id]", $.proxy(this.addcookie, this));  
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
       addcookie(event) {
        var target = event.target || event.srcElement;
        var goodsid = $(target).attr("data_id");
        $.cookie("shopcar", goodsid);
           window.location.href = "http://localhost/juanpi2/gooddetail.html";
      }, 
    
      getnum() {
        var shopcarstring = $.cookie("addcar");
        if (shopcarstring) {
          var shopcararray = JSON.parse(shopcarstring);
          var sum = 0;
          $.each(shopcararray, function(index, item) {
            sum += Number(item.num);          
          });
          return sum;
        }
        return 0;
      }
    }
})
