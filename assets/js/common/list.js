/**
 * Created by dinglei on 15/7/24.
 */
define(function(){
    var source =  '<div id="B_Scroll" class="bp-page-list">'
    +    '<div class="xs-container">'
    +    '<ul class="bp-list g-bizlist xs-list">'
    +    '{{each list as value i}}'
    +        '<li>���� {{i + 1}} ��{{value}}</li>'
    +    '{{/each}}'
    +    '</ul>'
    +    '</div>'
    +    '</div>';
    return {
        html : source
    };
});