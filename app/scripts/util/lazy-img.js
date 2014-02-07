/**
 * Lazy load of `<img>` and `background-image` based on window width and device
 * pixel ratio.
 *
 * # Example markup
 *
 *     <img class="lazy-img"
 *         data-src="img-mobile.jpg"
 *         data-src-retina="img-mobile@2x.jpg"
 *         data-src-lap="img-lap.jpg"
 *         data-src-lap-retina="img-lap@2x.jpg"
 *         data-src-desk="img-desk.jpg"
 *         data-src-desk-wide="img-desk-wide.jpg"
 *         data-ratio="1.5"
 *         data-ratio-desk="1.2"/>
 */

// Dependencies
var $ = require('jquery');
var _ = require('lodash');

// jQuery cached elements
var $window = $(window);
var $images;

// Other vars
var isRetina = window.devicePixelRatio > 1;
var windowWidth;
var windowHeight;
var selector;
var threshold;
var sizes;
var retinaAffix;
var isLazy;
var isScrolling = false;
var resizeTimer;

/**
 * Return highest matching data for an image. Iterates through sizes set in the
 * options and matches against the windows with.
 *
 * @param      {Object}     $image     jQuery object for a lazy image
 * @param      {String}     prefix     Data prefix to search for. E.g. with
 *     prefix set to `src` it will search for `data-src`, `data-src-lap` etc.
 *
 * @return     {String|undefined}      Value in the matching data. If no data is
 *     found it will return `undefined`
 */
var getRespData = function($image, prefix) {
    var data;
    var i = sizes.length - 1;
    var sizeLabel;
    var size;

    // Find highest (largest window width) matching source
    while (!data && i >= -1) {

        if (i >= 0) { // 'Special' sources found
            size = sizes[i];
            if (windowWidth < size.breakpoint) {
                i--;
                continue;
            }
            sizeLabel = prefix + '-' + size.name;

        } else { // Non 'special' sources found. Use default source
            sizeLabel = prefix;
        }

        if (isRetina) {
            data = $image.data(sizeLabel + '-' + retinaAffix);
        }

        if (!data) {
            data = $image.data(sizeLabel);
        }
        i--;
    }

    return data;
};

/**
 * Determine the source for this element based on the windows width.
 * Source is the highest matching src data.
 *
 * @param           {jqObject}          $image        jQuery object for image
 * @param           {Function}          callback
 *
 * @return          {void}
 */
var getSource = function($image, callback) {
    var source = getRespData($image, 'src');

    if (source !== $image.data('source')) {
        $image.data('source', source);

        // Cache image
        $('<img/>').attr('src', source).on('load', function() {
            $(this).remove(); // prevent memory leaks
            callback(source);
        });
    }
};
/**
 * Callback used for getSource
 *
 * @callback                        callback
 *
 * @param           {String}        source             URL for source to image
 */

/**
 * Set `src` for `<img>` and `background-image` for all other elements.
 * @return          {void}
 */
var attachSource = function() {
    var $image = $(this);
    getSource($image, function(source) {
        if ($image.is('img')) {
            // Set source on img tags
            $image.attr('src', source);
        } else {
            // Set background-image on all other tags
            $image.css({
                'background-image': 'url(' + source + ')'
            });
        }

        console.log('lazy-img', 'image attached', source);

        // Loaded class for use with stylesheet
        $image.addClass(selector.replace('.', '') + '--loaded');
    });
};

/**
 * Cache dimensions of window and image elements
 *
 * @return          {void}
 */
var getDimensions = function() {

    // Reset images list to be able to load images with differet media query
    $images = $(selector);

    // Cache window dimensions
    windowWidth = $window.width();
    windowHeight = $window.height();

    $images.each(function() {
        var $image = $(this);
        var height;
        var innerClass = selector + '__inner';
        var outerClass = selector + '__outer';

        // Use wrapper around image that immitates the size of the image.
        // This is done to avoid browser reflows then images isn loaded and to
        // be able to store the correct image offset values.
        // Technique from
        // http://alistapart.com/article/creating-intrinsic-ratios-for-video
        var $innerWrapper = $image.parents(innerClass);
        var $outerWrapper = $image.parents(outerClass);
        var ratio = getRespData($image, 'ratio');

        if (ratio) {

            // Create wrapper first time
            if ($innerWrapper.length === 0) {
                $image.wrap('<div class="' + outerClass.replace('.', '') + '" style="width:100%;" >/');
                $image.wrap('<div class="' + innerClass.replace('.', '') + '" style="height:0;" >/');
                $innerWrapper = $image.parents(innerClass);
                $outerWrapper = $image.parents(outerClass);
            }
            $innerWrapper.css('padding-bottom', (100 / 1.5) + '%');
            height = $outerWrapper.height();
        } else {
            height = $image.height();
        }

        // Stores values in data to avoid constant browser reflow when scrolling
        $image.data('offset-top', $image.offset().top);
        $image.data('height', height);
    });
};

/**
 * Detects which images is inside scroll threshold and starts the image loader
 * job. Removes loaded images from the list of images to load.
 *
 * @return          {void}
 */
var showImages = function() {

    var windowScrollTop = $window.scrollTop();

    // Find images to be loaded
    var $loaded = $images.filter(function() {
        var $image = $(this);

        // Don't load hidden background-images
        if (!$image.is('img') && $image.is(':hidden')) {
            return false;
        }

        if (!isLazy) {
            return true;
        }

        var windowBottom = windowScrollTop + windowHeight;
        var offsetTop = $image.data('offset-top');
        var offsetBottom = offsetTop + $image.data('height');

        return offsetBottom >= windowScrollTop - threshold && offsetTop <= windowBottom + threshold;
    });
    $loaded.trigger('show-image');

    // Remove loaded images from list to avoid multiple setting og source
    $images = $images.not($loaded);
};

/**
 * Initialize load of images and attaches load events.
 *
 * @return    {void}
 */
var initialize = function() {
    getDimensions();

    $images.each(function() {
        $(this).on('show-image', attachSource);
    });

    // Start listening for scroll and resize events
    $window.on('scroll', function() {

        // Only fire showImags every 200ms when scrolling
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(function() {
                showImages();
                isScrolling = false;
            }, 200);
        }
    });

    // Recalc images on scroll
    $window.on('resize', function() {
        clearTimeout(resizeTimer);

        // Only fore event when scroll is finished
        resizeTimer = setTimeout(function() {
            getDimensions();
            showImages();
        }, 200);
    });

    // Init
    showImages();
};

/**
 * Initialize the lazy image loader.
 *
 * # Example
 *
 *     lazyImg({
 *         threshold: 0, // Load images x pixels before they are in the visible area
 *         sizes: [ // Prefixes for breakpoints
 *             {
 *                 name: 'lap',
 *                 breakpoint: 481
 *             },{
 *                 name: 'desk',
 *                 breakpoint: 1024
 *             },{
 *                 name: 'desk-wide',
 *                 breakpoint: 1200
 *             }
 *         ],
 *         retinaAffix: 'retina', // Affix to indicate retina displays
 *         lazy: true // Whether or not to lazy load images
 *     });
 *
 * @param    {Object}    [options]                          Contains options
 *     for the image loader
 * @param    {String}    [options.selector='.lazy-img']     Selector to match
 *     against images to load.
 * @param    {Int}       [options.threshold=0]              Load images behover
 *     they're in the scrolling area. E.g. a value og `200` will load the images
 *     when they're 200 pixel above the window area.
 * @param    {Array}     [options.sizes]                    Array of responsive
 *     breakpoint. Each item of the array is an `object` consistiong of a `name`
 *     and a `breakpoint`. E.g. `[{name: 'lap', breakpoint: 480}]`
 * @param    {Int}       [options.sizes[0]={name:'lap',breakpoint:481}]
 * @param    {Int}       [options.sizes[1]={name:'desk',breakpoint:1024}]
 * @param    {Int}       [options.sizes[2]={name:'deks-wide',breakpoint:1200}]
 * @param    {String}    [options.retinaPAffix='retina']    Used for identifying
 *     retina sources. E.g. `data-src-retina="img@2x.jpg"`.
 * @param    {boolean}   [options.lazy=true]                If `true` images
 *     will first load when in scroll area.
 *
 * @exports
 *
 * @return   {void}
 */
module.exports = function(options) {

    // Options
    options = options || {};
    selector = options.selector || '.lazy-img';
    threshold = options.threshold || 0;
    sizes = options.sizes || [{
        name: 'lap',
        breakpoint: 481
    }, {
        name: 'desk',
        breakpoint: 1024
    }, {
        name: 'desk-wide',
        breakpoint: 1200
    }];
    retinaAffix = options.retinaAffix || 'retina';
    isLazy = options.lazy;
    if (!_.isBoolean(isLazy)) {
        isLazy = true;
    }

    // Filter out and sort media queries width numbers
    sizes = _.sortBy(sizes, 'breakpoint');

    console.log(' - info:', 'lazy-img', 'activated', {
        selector: selector,
        threshold: threshold,
        sizes: sizes,
        retinaAffix: retinaAffix,
        lazy: isLazy
    });

    // Filter out and sort media queries width numbers
    sizes = _.sortBy(sizes, 'breakpoint');

    initialize();

};

/**
 * Recalc images and show.
 *
 * # Example
 *
 *     $('<img class="lazy-img" data-src="img.jpg" />').appendTo('html');
 *
 *     // Recalc all images
 *     lazyImg.load();
 *
 * @exports
 *
 * @return     {void}
 */
module.exports.load = function() {
    getDimensions();
    $images.each(function() {
        $(this).on('show-image', attachSource);
    });
    showImages();
};
