// Dependencies
var expect = require('chai').expect;
var $ = require('jquery');

// Source file
var lazyImg = require('app/util/lazy-img');

describe('app/util/lazy-img', function() {

    var imgSrc = '/data/blank.gif';

    lazyImg();

    it('should set the src attribute of an img tag', function(done) {
        var $image = $('<img class="lazy-img" data-src="' + imgSrc + '" />')
            .prependTo('body');
        $image.on('load', function() {
            expect($image.attr('src')).to.contain(imgSrc);
            $image.remove(); // Clean up
            done();
        });
        lazyImg.load();
    });

    it('should set the background-image attribute of an div tag', function(done) {
        var $image = $('<div class="lazy-img" data-src="' + imgSrc + '" />')
            .prependTo('body');
        var checkBgImage = setInterval(function() {
            var bgImage = $image.css('background-image');
            if (bgImage && bgImage !== 'none') {
                expect(bgImage).to.contain(imgSrc);

                // Clean up
                $image.remove();
                clearInterval(checkBgImage);

                done();
            }

        }, 10);
        lazyImg.load();
    });

});
