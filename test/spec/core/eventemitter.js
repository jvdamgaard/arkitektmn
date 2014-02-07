// Dependencies
var expect = require('chai').expect;
var EventEmitter = require('events').EventEmitter;

// Source file

describe('EventEmitter', function() {
    describe('Used to create a publisher/subscriber pattern', function() {
        var module = new EventEmitter();

        beforeEach(function() {
            module.removeAllListeners();
        });

        it('should fire events', function(done) {

            // Add listener
            module.on('test', done);

            // Trigger event
            module.emit('test');
        });

        it('should be able to remove eventlistener', function(done) {

            // Add listener
            module.on('test', done);

            // Remove just added listener
            module.removeListener('test', done);

            // Trigger event
            module.emit('test', 'should never be called');
            done();
        });

        it('should only be called once', function() {
            var called = false;

            module.once('test', function() {
                expect(called).to.be.false;
                called = true;
            });

            module.emit('test');
            module.emit('test');

        });

    });
});
