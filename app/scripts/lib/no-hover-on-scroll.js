/**
 * Disable hover effects when scrolling. This is done by adding an overlaying
 * div with `pointer-events: none`. Resulting in higher framerates.
 * Code and technique from:
 * [thecssninja.com/javascript/follow-up-60fps-scroll](http://www.thecssninja.com/javascript/follow-up-60fps-scroll)
 */

// Dependencies

/**
 * Self invoking functions that checks if pointer events is supported.
 *
 * @return    {bool}
 */
var support = (function() {
    var element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
}());

/**
 * Fire clicks events while scrolling.
 * Disable hover effects when scrolling. This is done by adding an overlaying
 * div with `pointer-events: none`. Resulting in higher framerates.
 *
 * @param     {Object}    coords    Coordinate for mouse click
 * @param     {Int}       coords.x
 * @param     {Int}       coords.y
 *
 * @return    {void}
 */
var dispatchClick = function(coords) {
    var event = document.createEvent('MouseEvent');
    var elem = document.elementFromPoint(coords.x, coords.y);

    event.initMouseEvent(
        'click',
        true, // bubble
        true, // cancelable
        window, null,
        coords.x, coords.y, 0, 0, // coordinates
        false, false, false, false, // modifier keys
        0, // left
        null
    );
    event.synthetic = true;

    elem.dispatchEvent(event);
};

document.addEventListener('DOMContentLoaded', function() {
    if (!support) {
        return;
    }

    var cover = document.createElement('div');
    var body = document.body;
    var coverStyle = cover.style;
    var scrollStarted = false;
    var timer;
    var clicked = false;
    var pos = {
        x: 0,
        y: 0
    };

    coverStyle.cssText = [
        '-webkit-transform: translate3d(0,0,0);',
        'transform: translate3d(0,0,0);',
        'position: fixed;',
        'top: 0;',
        'right: 0;',
        'left: 0;',
        'bottom: 0;',
        'opacity: 0;',
        'z-index: 9;',
        'pointer-events: none'
    ].join('');

    window.addEventListener('scroll', function scroll() {
        if (!scrollStarted) {
            body.appendChild(cover);
            coverStyle.pointerEvents = 'auto';
            scrollStarted = true;
        }
        clearTimeout(timer);

        timer = setTimeout(function() {
            body.removeChild(cover);
            coverStyle.pointerEvents = 'none';
            scrollStarted = false;
            if (clicked) {
                dispatchClick(pos);
                clicked = false;
            }
        }, 500);
    }, false);

    // capture all clicks and store x, y coords for later
    document.addEventListener('click', function clickCatcher(event) {
        if (event.target === cover && !event.synthetic) {
            pos.x = event.clientX;
            pos.y = event.clientY;
            clicked = true;
        }
    }, false);
}, false);
