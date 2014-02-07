// Dependencies
var expect = require('chai').expect;

// Source file
var namespace = require('app/util/namespace');

describe('app/util/namespace', function() {

    var modules = {};

    it('should make sure, that a dot noted string is a safe object to use', function() {
        namespace('a.test.module', modules);
        expect(modules.a.test.module).to.be.an('object');
    });

    it('should return the given namespace', function() {
        var module = namespace('another.test.module', modules);
        expect(module).to.eql(modules.another.test.module);
    });

    it('should use the given root object as the starting point for the namespace', function() {
        var module = namespace('yet.another.test.module', modules);
        expect(module).to.eql(modules.yet.another.test.module);
    });
});
