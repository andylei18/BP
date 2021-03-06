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
            'assets/js/lib/xlist'
        ], function (tmpl,list) {
            $doc.trigger('bp:addstyle', 'assets/css/module/pagelist.css');
            var render = tmpl.compile(list.html);
            var html = render({
                list: ['摄影', '电影', '民谣', '旅行', '吉他', '民谣', '旅行', '吉他', '民谣', '旅行', '吉他', '民谣', '旅行', '吉他', '民谣', '旅行', '吉他', '民谣', '旅行', '吉他', '民谣', '旅行', '吉他', '民谣', '旅行', '吉他']
            });
            document.getElementById('B_PageList').innerHTML = html;
            var hasClass = function(el, className) {
                return el && el.className && el.className.indexOf(className) != -1;
            };
            var addClass = function(el, className) {
                if (el && !hasClass(el, className)) {
                    el.className += " " + className;
                }
            };
            var removeClass = function(el, className) {
                if (el && el.className) {
                    el.className = el.className.replace(className, "");
                }
            };
            var pageCache ={};
            var page = 1;
            var totalPage = 20;
            var ds = new XList.DataSet();
            var xlist = new XList({
                renderTo:"#B_Scroll",
                infiniteElements:"#B_Scroll .xs-row",
                itemHeight:70,
                renderHook:function(el,row){
                    var html = '';
                    if(row.data.type == "normal"){
                        removeClass(el,"content-title");
                        html = '<div class="lbl">'+row.data.text+'</div>'+
                            '<div class="control">'+
                            '<div class="btn btn-delete">删除</div></div>'
                    }else{
                        addClass(el,"content-title");
                        html = row.data.text;
                    }
                    el.innerHTML = html;
                }
            });
            xlist.appendDataSet(ds);
            xlist.plug(new XList.Plugin.PullDown());
            var maxWidth = xlist.renderTo.offsetWidth * 0.4;
            var swipeEditPlugin = new XList.Plugin.SwipeEdit({
                labelSelector:".lbl",
                width:maxWidth
            });
            xlist.plug(swipeEditPlugin);
            //删除
            xlist.on("click",function(e){
                if(e.target.className.match("btn-delete")){
                    xlist.removeData(0,e.cell._row);
                    xlist.render();
                }
            });
            xlist.on("click", function(e) {
                if(!e.target.parentNode.className.match('control')){
                    swipeEditPlugin.slideAllExceptRow();
                }
            });
            var pullup = new XList.Plugin.PullUp({
                upContent:"上拉加载更多",
                downContent:"释放加载更多",
                loadingContent:"加载中...",
                bufferHeight:100
            });
            xlist.plug(pullup);
            pullup.on("loading",function(){
                getData()
            });
            xlist.render();
            var getData = function () {
                if(!pageCache[page]){
                    pageCache[page] = 1;
                    $.ajax({
                        url:"assets/json/listData.json",
                        dataType:"json",
                        success:function(data){
                            if(page > totalPage) {
                                pullup.reset();
                                xlist.unplug(pullup);
                                return;
                            };
                            ds.appendData(data);
                            xlist.render();
                            pullup.complete();
                            page++;
                        }
                    })
                }
            };
            getData();
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
            console.log(url)
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
