/**
 * Created by dinglei on 15/8/20.
 */
define(function(){
    return function(options){
        var opts = $.extend({
            renderTo : "#id",
            cfg :"#id"
        },options);
    };
    require([ 'assets/js/lib/xscroll'], function () {
        var xscroll = new XScroll({
            renderTo: renderTo,
            scrollbarY: false,
            scrollbarX: false,
            lockX: true
        });
        xscroll.render();
        var menuHeight = document.querySelector(opts.renderTo + " li").offsetHeight;
        var curIndex = 0;
        //click to move
        xscroll.renderTo.addEventListener("click", function(e) {
            var offset = xscroll.getOffsetTop();
            var index = Math.floor((e.pageY - XScroll.Util.getOffsetTop(xscroll.renderTo) + Math.abs(offset)) / menuHeight);
            switchTo(index);
            opts.cfg && opts.cfg.onSwitch && opts.cfg.onSwitch(index);
        });

        var menus = document.querySelectorAll(renderTo + " li");
        switchTo(0)

        function switchTo(index) {
            if (index < 0 || index > menus.length - 1) return;
            for (var i in menus) {
                menus[i].className = "";
            }
            menus[index].className = "cur";
            var offset = index * menuHeight - xscroll.height/2 + menuHeight/2;
            if (offset < 0) {
                offset = 0;
            } else if (offset > xscroll.containerHeight - xscroll.height) {
                offset = xscroll.containerHeight - xscroll.height
            }
            xscroll.scrollY(offset, 200)
            curIndex = index;
        }

        function prevTo() {
            if (curIndex <= 0) {
                switchTo(curIndex);
                return;
            }
            curIndex--;
            switchTo(curIndex);
        }

        function nextTo() {
            if (curIndex >= menus.length - 1) {
                switchTo(curIndex);
                return;
            }
            curIndex++;
            switchTo(curIndex);
        }
    });

});