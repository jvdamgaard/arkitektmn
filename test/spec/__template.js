/**
 * # Filename convention
 *
 * If file start with underscore it is excluded from the coverage report.
 * The coverage report is run with node.js and therefore there is no browser
 * specific objects like `window`. Therefore tests that are dependent of browser
 * behaviour has to be excluded from the coverage report, which is done
 * prepending the filename with an underscore.
 *
 * Certain browser behaviours like $.ajax can be stubbed with the `sinonjs`
 * library.
 */

// // Dependencies
// var expect = require('chai').expect;
// var sinon = require('sinon');

// // Source file
// var namespace = require('lib/util/namespace');

// describe('module/name', function() {

//     describe('description', function() {

//         it('should ...', function(done) {
//             done();
//         });

//     });

// });
