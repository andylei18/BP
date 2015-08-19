/**
 * Created by dinglei on 2015/7/22.
 */

define({
    title: 'BP 移动端框架',
    body: '<div class="bp-mobile-header"><div id="B_HeaderContent" class="header-content mui-flex"></div></div>\
            <div id="B_FpContent" class="bp-mobile-content"></div>\
            <div id="B_PageList" class="bp-mobile-content"></div>\
',
    init: function(pageData) {
        var $view = this;

        // 加载Head模板
        require(['assets/js/lib/template','assets/tmpl/head'], function (tmpl,head) {
            var render = tmpl.compile(head);
            var html = render({
                list: ['摄影', '电影', '民谣', '旅行', '吉他']
            });
            document.getElementById('B_HeaderContent').innerHTML = head;
        });

        // 加载Banner模板
        require(['assets/js/lib/template','assets/tmpl/banner'], function (tmpl,banner) {
            $doc.trigger('bp:addstyle', 'assets/css/module/banner.css');
            document.getElementById('B_FpContent').innerHTML = banner;
            require(['assets/js/lib/swiper.min'],function(){
                var domH = document.documentElement.clientHeight,
                     domW = document.documentElement.clientWidth,
                     node = document.querySelector(".swiper-container");
                     node.style.height = domH * 0.3 + "px";

                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: 2500,
                    autoplayDisableOnInteraction: false
                });
            });
        });

        //加载PageList
        require([
            'assets/js/lib/template',
            'assets/js/common/list',
            'assets/js/lib/xscroll'
        ], function (tmpl,list) {
            $doc.trigger('bp:addstyle', 'assets/css/module/pagelist.css');
            var render = tmpl.compile(list.html);

            var html = render({
                list: ['摄影', '电影', '民谣', '旅行', '吉他']
            });

            document.getElementById('B_PageList').innerHTML = html;

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

        //打开侧栏菜单
        /*$view.on('click', '#B_CategoryTrigger', function(event) {
            event.preventDefault();
            var $btn = $(this),
                 panelid = $btn.attr('data-panel');
            $doc.trigger('bp:openpanel', [panelid])
        });*/
       /* $view.on('click', '#B_CategoryTrigger', function(event) {
            event.preventDefault();
            var $btn = $(this),
                panelid = $btn.attr('data-panel');
            $doc.trigger('bp:openpanel', [panelid])
        });*/

        // 获取hash
        function getHash(url) {
            url = url || location.href;
            return url.replace(/^[^#]*#?\/?(.*)\/?$/, '$1');
        }

        $view.on('click', '.btn-demo-panel', function(event) {
            event.preventDefault()
            var $btn = $(this),
                panelid = $btn.attr('data-panel');
            $doc.trigger('bp:openpanel', [panelid]);
        });

        $view.on('click', '.btn-transitpage', function(event) {
            event.preventDefault()
            var $btn = $(this),
                animate = $btn.attr('data-animate'),
                hash = getHash($btn.attr('href'));
            $doc.trigger('bp:navigate', {hash: hash, pushData: {animate: animate}});
        });

        $view.on('click', '.btn-transitpanel', function(event) {
            event.preventDefault()
            var $btn = $(this),
                animate = $btn.attr('data-animate');
            $doc.trigger('bp:openpanel', ['demoPanelTransit', {animate: animate}])
        });

        $('.page-container-navbar', $view).trigger('bp:scroll');
    }
});
