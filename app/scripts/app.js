/**
 * Main entry for the javascripts.
 * Logs dependencies version
 *
 * # External dependencies to be used
 *
 *     var _ = require('lodash');
 *     var $ = require('jquery');
 *     var moment = require('moment');
 */

// Dependencies
var _ = require('lodash');
var $ = require('jquery');
var moment = require('moment');
moment.lang(require('moment/lang/da'));
var app = require('app');

// Load modules
require('app/lib/no-hover-on-scroll');
require('app/util/lazy-img')({
    threshold: 200
});
require('./modules/fullsize-images').load();
require('./modules/navigation').setOffsetElement('#frontpage-spoiler');

/**
 * Log version of dependencies with beautified formatting.
 *
 * # Example
 *
 *     logVersion('Lo-Dash', _.VERSION);
 *     // => ' - Lo-Dash              : 2.4.1'
 *
 * @param     {String}     name        Name of library/dependency
 * @param     {String}     version     Version number in format {major}.{minor}.{patch}
 *
 * @return    {void}
 */
var logVersion = function(name, version) {
    var charsBeforeSeperator = 25;
    var content = ' - ' + name;
    content += new Array(charsBeforeSeperator - content.length).join(' ');
    content += ': ' + version;
    console.log(content);
};

/**
 * Log a seperator with lines.
 *
 * # Example
 *
 *     logSeperator();
 *     // => '---------------------------------------'
 *
 * @return     {void}
 */
var logSeperator = function() {
    console.log(new Array(40).join('-'));
};

// Log versions of dependencies
logSeperator();
logVersion(app.name, app.version);
logSeperator();
logVersion('jQuery', $.fn.jquery);
logVersion('Modernizr', Modernizr._version);
logVersion('Lo-Dash', _.VERSION);
logVersion('Moment', moment.version);
logSeperator();
