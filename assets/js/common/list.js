/**
 * Created by dinglei on 15/7/24.
 */
define(function(){
    var source =  '<div id="B_Scroll" class="bp-page-list">'
    +    '<div class="xs-container">'
    +    '<ul class="bp-list xs-content xs-list">'
    +    '{{each list as value i}}'
    +        '<li class="xs-row">索引 {{i + 1}} ：{{value}}</li>'
    +    '{{/each}}'
    +    '</ul>'
    +    '</div>'
    +    '</div>';
    return {
        html : source
    };
});