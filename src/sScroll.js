/* Sergio Scroll v1.0 Licença: livre para a galera toda! rsrs*/
var sScroll = function(selector){
    this.scrollerContainer = $(selector);
    if(this.scrollerContainer.length > 0){
        this.scrollerContent = this.scrollerContainer.find(".scroller-content");
        this.scrollerControl = this.scrollerContainer.find(".scroller-control")
        this.scrollerCar = this.scrollerControl.find("button");

        this.init();
    }
}

sScroll.prototype = {
    init: function(){
        //set car height
        this.setCarSize();

        var self = this;
        var lastMove = 0;
        var move = 0;
        var position;

        this.scrollerCar.on("touchstart mousedown", function(e){
            e.preventDefault();

            if(e.screenY != undefined){
                position = {screenY: e.screenY, screenX: e.screenX}
            }else{
                position = {screenY: e.changedTouches[0].screenY, screenX: e.changedTouches[0].screenX}
            }

            var startPos = position.screenY;

            $(this).on("touchmove mousemove", function(e){
                e.preventDefault();

                if(e.screenY != undefined){
                    position = {screenY: e.screenY, screenX: e.screenX}
                }else{
                    position = {screenY: e.changedTouches[0].screenY, screenX: e.changedTouches[0].screenX}
                }

                var actualPos = position.screenY;
                move = (actualPos - startPos) + lastMove;

                if(move < 0){
                    move = 0;
                }

                if(move + self.scrollerCar.height() > self.scrollerControl.height()){
                    move = Math.abs(self.scrollerCar.height() - self.scrollerControl.height());
                }

                $(this).css("margin-top", move + "px");
                self.moveContent();
            });
        }).on("touchend mouseup", function(e){
            e.preventDefault();
            if(e.screenY != undefined){
                position = {screenY: e.screenY, screenX: e.screenX}
            }else{
                position = {screenY: e.changedTouches[0].screenY, screenX: e.changedTouches[0].screenX}
            }

            $(this).off("touchmove mousemove");

            lastMove = move;
        });

        this.scrollerContent.on("touchstart mousedown", function(e){
            e.preventDefault();

            if(e.screenY != undefined){
                position = {screenY: e.screenY, screenX: e.screenX}
            }else{
                position = {screenY: e.changedTouches[0].screenY, screenX: e.changedTouches[0].screenX}
            }

            var startPos = position.screenY;

            $(this).on("touchmove mousemove", function(e){
                e.preventDefault();

                if(e.screenY != undefined){
                    position = {screenY: e.screenY, screenX: e.screenX}
                }else{
                    position = {screenY: e.changedTouches[0].screenY, screenX: e.changedTouches[0].screenX}
                }

                var actualPos = position.screenY;

                move = (actualPos - startPos) + lastMove * -1;

                if(move > 0){
                    move = 0;
                }

                if((move * - 1) + self.scrollerCar.height() > self.scrollerControl.height()){
                    move = Math.abs(self.scrollerCar.height() - self.scrollerControl.height()) * -1;
                }

                self.scrollerCar.css("margin-top", move * -1 + "px");
                self.moveContent();
            });
        }).on("touchend mouseup", function(e){
            e.preventDefault();
            if(e.screenY != undefined){
                position = {screenY: e.screenY, screenX: e.screenX}
            }else{
                position = {screenY: e.changedTouches[0].screenY, screenX: e.changedTouches[0].screenX}
            }

            $(this).off("touchmove mousemove");

            lastMove = move * -1;
        });
    },
    showOffset: function(name, element){
        console.info(name + " - width:  " + element.offset().width + ", height: " + element.offset().height)
    },
    getContentDifference: function(){
        var containerHeight = this.scrollerContainer.offset().height;
        var contentHeight = this.scrollerContent.offset().height;
        var height;

        if(containerHeight < contentHeight){
            height = (containerHeight * 100) / contentHeight;
            height = height;
        }else{
            height = 100;
        }

        return height;
    },
    refresh: function(){
        this.setCarSize();
        this.setContentPos();
    },
    setCarSize: function(){
        var height = this.getContentDifference();
        this.scrollerCar.height(height + "%");
    },
    moveContent: function(){
        var move = this.scrollerCar.css("margin-top").replace("px", "");
        move = (move * 100) / this.scrollerContainer.offset().height;
        move = this.scrollerContent.offset().height * (move / 100)

        this.scrollerContent.css("margin-top", "-"+ move + "px");
    }
}
