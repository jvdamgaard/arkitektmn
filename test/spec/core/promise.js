// Dependencies
var expect = require('chai').expect;
var Promise = require('bluebird');

describe('Promise', function() {

    it('should have promises implemented of resolved', function(done) {
        var promise = new Promise(function(resolve, reject) {
            if (true === true) {
                resolve('Stuff worked!');
            } else {
                reject(new Error('It broke'));
            }
        });

        promise.then(function(result) {
            expect(result).to.exist;
            done();
        }, function(err) {
            done(err);
        });

    });

    it('should have promises implemented of reject', function(done) {
        var promise = new Promise(function(resolve, reject) {
            if (true === false) {
                resolve('Stuff worked!');
            } else {
                reject('It broke');
            }
        });

        promise.then(function(result) {
            expect(result).to.not.exist;
            done();
        }, function(err) {
            expect(err).to.exist;
            done();
        });

    });
});
