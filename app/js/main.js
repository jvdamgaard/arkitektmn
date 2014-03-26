/* global $ */

$(function() {
    $.fn.fullpage({
        verticalCentered: true,
        menu: false,
        css3: true,
        animateAnchor: false,
        scrollingSpeed: 500,
        fixedElements: '.menu, .logo, .email',
        resize: false
    });
});
