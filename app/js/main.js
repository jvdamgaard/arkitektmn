/* global $ */

$(function() {

    var $sections = $('.section');

    var slides = [];
    $sections.each(function(index, element) {
        slides.push($(element).find('.slide'));
    });

    // Initialize full page
    $.fn.fullpage({
        verticalCentered: true,
        menu: false,
        css3: true,
        navigation: true,
        slidesNavigation: true,
        animateAnchor: false,
        scrollingSpeed: 500,
        fixedElements: '.menu, .logo, .email',
        resize: false,
        loopHorizontal: false,
        onLeave: function(index, direction) {
            if (direction === 'down') {

                // Load second slide
                if (slides[index].length >= 2) {
                    $(slides[index][1]).removeClass('no-load');
                }

                var loadIndex = index + 1;
                if (loadIndex < $sections.length) {
                    $($sections[loadIndex]).removeClass('no-load');

                    // Load first slide
                    if (slides[loadIndex].length) {
                        $(slides[loadIndex][0]).removeClass('no-load');
                    }

                }
            }
        },
        afterLoad: function(anchorLink, index) {
            $(slides[index - 1][0]).removeClass('no-load');
            if (slides[index - 1].length > 1) {
                $(slides[index - 1][1]).removeClass('no-load');
            }
            if (slides.length > index) {
                $(slides[index][0]).removeClass('no-load');
            }
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction) {
            if (direction === 'right') {

                // Load third slide and up
                var $slides = slides[index - 1];
                var loadIndex = slideIndex + 2;
                if (loadIndex < $slides.length) {
                    $($slides[loadIndex]).removeClass('no-load');
                }
            }
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            var $slides = slides[index - 1];
            $($slides[slideIndex]).removeClass('no-load');

            // Load next
            if (slideIndex + 1 < $slides.length) {
                $($slides[slideIndex + 1]).removeClass('no-load');
            }
        }
    });
});
