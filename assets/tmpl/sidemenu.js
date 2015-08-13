define({
  body: '<div class="bp-nav-tab"><div class="tab-container" id="B_TabContainer">\
              <div class="tab-header" id="B_TabHeader"><h1>全部分类</h1></div>\
              <div class="tab-content" id="B_TabContent">\
                  <div class="tab-nav" id="B_TabNav">\
                    <ul><li class="active" data-index="0" data-id="176">为您推荐</li></ul>\
                  </div>\
              </div>\
           </div></div>\
  ',
  init: function(panelData) {

    var $view = this;
    //$tab.style.webkitTransition = left +  0.5 +"s"+ cubic-bezier(0.165, 0.84, 0.44, 1);
    //$tab.style.transition = left +  0.5 +"s"+ cubic-bezier(0.165, 0.84, 0.44, 1);

    $('.tab-container', $view).trigger('bp:scroll');
  }
});