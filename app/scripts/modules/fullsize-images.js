// Dependencies
var $ = require('jquery');

var $images;
var windowHeight;

var resize = function() {
    windowHeight = $(window).height();
    $images.height(windowHeight);
};

var load = function() {
    $images = $('.image--fullsize');
    resize();
};

$(window).on('resize', resize);

module.exports.resize = resize;
module.exports.load = load;
