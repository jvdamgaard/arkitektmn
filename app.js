/**
 * Main entry for server
 *
 * - Use express server
 * - h5bp configs
 */

// Dependencies
var h5bp = require('h5bp');
var express = require('express');

// Used for source maps
var isDevelopment = (process.env.NODE_ENV === 'development');

var app = express();

// Views
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// H5BP configs
app.use(h5bp({
    root: __dirname + '/.tmp/dist',
    www: false,
    cors: true
}));
app.use(express.compress());
app.use(express.static(__dirname + '/.tmp/dist'));

// Include source maps in development
if (isDevelopment) {
    app.use('/app', express.static(__dirname + '/app'));
}

// Frontpage
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Arkitekttegnestuen Merete Nielsen',
        development: isDevelopment
    });
});

app.listen(9000);

console.log('App running on http://localhost:' + process.env.PORT);
