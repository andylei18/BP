/**
 * Created by dinglei on 15/7/24.
 */
define(function(){
    return '<div class="category-menu cell fixed"><a href="#demo/newpage" target="_self" id="B_CategoryTrigger" class="category-trigger">×</a></div>'
        +    '<div id="B_MobileSearch" class="mobile-search cell">'
        +    '<form id="B_SearchForm" action="head.htm" method="get" accept-charset="GBK" target="_self">'
        +    '<div class="s-combobox">'
        +    '<div class="s-combobox-input-wrap">'
        +    '<input placeholder="BP 前端团队" name="q" value="" class="search-input" type="search" accesskey="s" autocomplete="off">'
        +    '</div>'
        +    '</div>'
        +    '<input type="hidden" name="type" value="p">'
        +    '<input type="submit" class="search-button">'
        +    '</form>'
        +    '</div>';
    //+    '<div class="my-info cell fixed"><a href="javascript:void(0);" target="_self" id="B_MyInfoTrigger" class="my-info-trigger">登录</a></div>';
});
