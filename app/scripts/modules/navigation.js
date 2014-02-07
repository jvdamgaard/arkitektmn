// Dependencies
var $ = require('jquery');

var offset = 0;
var $document = $(document);
var $navigation = $('.navigation');
var $offsetElement;

var checkScrollPosition = function() {
    var scrollPosition = $document.scrollTop();
    var isScrolledPasOffset = (scrollPosition >= offset);
    $navigation.toggleClass('navigation--fixed', isScrolledPasOffset);
};

var setOffset = function() {
    if (!$offsetElement) {
        offset = 0;
    } else {
        offset = $offsetElement.position().top + $offsetElement.height();
    }
};

$(window).on('scroll', checkScrollPosition);
$(window).on('resize', setOffset);

module.exports.setOffsetElement = function(selector) {
    $offsetElement = $(selector);
    setOffset();
    checkScrollPosition();
};
