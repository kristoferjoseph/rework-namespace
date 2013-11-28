var rework = require('rework'),
    assert = require('assert'),
    read = require('fs').readFileSync,
    mkdirp = require('mkdirp'),
    namespace = require('..');

describe('rework-namespace', function() {

    before(function() {
        mkdirp.sync('tmp');
    });

    it('should add namespace', function() {
        var actual = rework(read('test/fixtures/namespace.fixture.css', 'utf8'))
            .use(namespace('dam'))
            .toString()
            .trim(),
            expected = read('test/expected/namespace.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match expected namespaced result');
    });

});
