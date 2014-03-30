/* global $ */

$(function() {

    var $sections = $('.section');

    // Initialize full page
    $.fn.fullpage({
        verticalCentered: true,
        menu: false,
        css3: true,
        animateAnchor: false,
        scrollingSpeed: 500,
        fixedElements: '.menu, .logo, .email',
        resize: false,
        onLeave: function(index, direction) {
            if (direction === 'down'){
                var loadIndex = index + 1;
                if (loadIndex < $sections.length) {
                    $($sections[loadIndex]).removeClass('no-load');
                }
            }
        }
    });
});
