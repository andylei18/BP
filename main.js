/**
 * Created by dinglei on 2015/7/15.
 */
require.config({
    baseUrl: '',
    //urlArgs: "v=" +  (new Date()).getTime(),
    urlArgs: 'v=20150722',
    paths: {}
});

var $doc = $(document);

// 首页
var pageHome = {
    route: '',
    classname: 'home',
    animate: 'fadeIn',
    view: function() {
        // 注入样式
        $doc.on('bp:addstyle', function(event, css) {
            $('head').append('<link rel="stylesheet" href="'+css+'">')
        });
        $doc.trigger('bp:addstyle', 'assets/css/module/index.css');

        var $page = this;
        requirejs(['assets/js/module/home'], function(viewData) {
            $doc.trigger('bp:initpage', [$page, viewData]);
        });
    }
};

//轮播图
/*var banNer = {
    id: 'sideMenu',
    classname: 'slideInLeft',
    animate: 'revealInRight',
    view: function() {
        // 注入样式
        $doc.trigger('bp:addstyle', 'assets/css/module/banner.css');
        var $page = this;
        requirejs(['assets/tmpl/banner'], function(viewData) {
            $doc.trigger('bp:initpage', [$page, viewData]);
        });
    }
};*/


// 侧边栏菜单
var sideMenu = {
    id: 'sideMenu',
    classname: 'slideInLeft',
    animate: 'revealInRight',
    view: function() {
        var $panel = this;
        // 注入样式
        $doc.trigger('bp:addstyle', 'assets/css/module/sidemenu.css');
        requirejs(['assets/tmpl/sidemenu'], function(viewData) {
            $doc.trigger('bp:initpanel', [$panel, viewData]);
        });
    }
};


// demo:打开新页面视图
var demoNewPage = {
    route: 'demo/newpage',
    classname: 'demo-newpage',
    animate: 'slideInRight',
    view: function() {
        var $page = this
        requirejs(['demo.newpage'], function(viewData) {
            $doc.trigger('bp:initpage', [$page, viewData])
        })
    }
};

// demo:页面视图转换动画
var demoTransitPage = {
    route: 'demo/transitpage',
    classname: 'demo-transitpage',
    animate: 'default',
    view: function() {
        var $page = this
        requirejs(['demo.transitpage'], function(viewData) {
            $doc.trigger('bp:initpage', [$page, viewData]);
        })
    }
};

$doc.trigger('bp:route', [pageHome,demoNewPage, demoTransitPage]);



// demo:提示对话框
var demoPanelAlert = {
    id: 'demoPanelAlert',
    classname: 'demo-panel-alert',
    animate: 'zoomIn',
    view: function() {
        var $panel = this
        requirejs(['demo.panelalert'], function(viewData) {
            $doc.trigger('bp:initpanel', [$panel, viewData])

            var $dialog = $('.panel', $panel)

            //高度居中
            $dialog.css({marginTop: ($panel.height() - $dialog.prop('offsetHeight')) / 2})

            $panel.on('click touchstart', 'button', function(event) {
                $panel.trigger('bp:closepanel')
                event.stopPropagation()
                event.preventDefault()
            })
        })
    }
};

// demo:确认对话框
var demoPanelConfirm = {
    id: 'demoPanelConfirm',
    classname: 'demo-panel-confirm',
    animate: 'overlayInUp',
    view: function() {
        var $panel = this
        requirejs(['demo.panelconfirm'], function(viewData) {
            $doc.trigger('bp:initpanel', [$panel, viewData])
        })
    }
};

// demo:面板视图转换动画
var demoPanelTransit = {
    id: 'demoPanelTransit',
    classname: 'demo-panel-transit',
    animate: 'overlayInLeft',
    view: function() {
        var $panel = this
        requirejs(['demo.paneltransit'], function(viewData) {
            $doc.trigger('bp:initpanel', [$panel, viewData])
        })
    }
};

$doc.trigger('bp:panel', [sideMenu, demoPanelAlert, demoPanelConfirm, demoPanelTransit])

$(function() {
    $doc.trigger('bp:main')
});

