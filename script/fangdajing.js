define(["jquery"],function(){
    
    function magnifier(){
    
    }
    magnifier.prototype = {
        constructor:magnifier,
        init(ele){
            this.wrap = $(ele),
            this.img = $(".tupian")
            this.size = { height: this.img.height(), width: this.img.width() };
            console.log(this.img)
            this.wrap.on("mouseenter",function(){
                this.movein();
                this.wrap.on("mousemove",$.proxy(this.move,this))
            }.bind(this))
            this.wrap.on("mouseleave",$.proxy(this.moveout,this))
        },
        movein(){
            if (this.img.height() == this.size.height) {
            this.img.css({height:this.img.height()*2,width:this.img.width()*2})
            .stop()
            .animate({opacity:"1"},300)
            }
        },
        moveout(){
            this.img.css({left:0,top:0})
            var that = this.img;     
            if (this.img.height() / 2 == this.size.height) {
                that.stop().animate({ opacity: "0.8" }, 300, function () {
                    that.css({
                        height: that.height() / 2,
                        width: that.width() / 2,
                        left:0,
                        top:0,
                    });
                });
            }
                console.log(1)
            
        },
        move(event){
            this.img.css({
                left: -event.offsetX / 2,
                top: -event.offsetY / 2
            })
        }
        
    }
    return new magnifier();
})