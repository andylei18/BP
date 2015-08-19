/**
 * Created by dinglei on 2015/8/11.
 */
define({
    body: '<div id="B_Scroll" class="bp-page-list">\
                <div class="xs-container">\
                    <ul class="bp-list g-bizlist xs-list">\
                        <li class="item">\
                            <img src="http://fuss10.elemecdn.com/d/9b/b1a672a2ecf93ced1105db9565c5fjpeg.jpeg?w=140&amp;h=140" class="mark">\
                            <div class="info flex"></div>\
                        </li>\
                        <li class="item">row</li>\
                        <li class="item">row</li>\
                    </ul>\
                </div>\
             </div>\
  ',
    init: function() {
        var $view = this;

        //var ul = document.querySelector("");
        $doc.trigger('bp:addstyle', 'assets/css/module/pagelist.css');


        require(['assets/js/lib/xscroll'], function (tmpl) {
            document.body.addEventListener("touchmove",function(e){e.preventDefault()});
            var pageCache ={},
                page = 1,
                totalPage = 2;



            var xscroll = new XScroll({
                renderTo:"#B_Scroll",
                scrollbarX:false,
                lockX:true
            });
            var pulldown = new XScroll.Plugin.PullDown({
                autoRefresh:false
            });

            xscroll.plug(pulldown);

            var getData = function(){
                if(!pageCache[page]){
                    pageCache[page] = 1;
                    $.ajax({
                        url:"assets/json/listData.json",
                        dataType:"json",
                        success:function(data){
                            if(page > totalPage) {
                                //last page
                                pullup.reset();
                                //destroy plugin
                                xlist.unplug(pullup);
                                return;
                            };
                            ds.appendData(data);
                            xlist.render();
                            //loading complete
                            pullup.complete();
                            page++;
                        }
                    })
                }
            };

            pulldown.on("loading",function(e){
                $.ajax({
                    url:"./data.json",
                    dataType:"json",
                    success:function(data){
                        //scrollback to the top
                        pulldown.reset(function(){
                            //repaint
                            xscroll.render();
                        });

                        if(page > totalPage) {
                            //last page
                            pulldown.reset();
                            //destroy plugin
                            xscroll.unplug(pulldown);
                            return;
                        };
                        xscroll.render();
                        //loading complete
                        xscroll.complete();
                        page++;
                    }
                })
            });
            xscroll.render();
        });


        return $view;
    }
});