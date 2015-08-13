/**
 * Created by dinglei on 2015/8/11.
 */
define({
    body: '<div class="bp-nav-tab">1111111111111111111</div>\
  ',
    init: function() {
        var $view = this;
        data = $view;
        $(".bp-nav-tab").click(function(){
            alert(123)
        })
        $('.bp-nav-tab', $view).trigger('bp:scroll');
        return data;
    }
});