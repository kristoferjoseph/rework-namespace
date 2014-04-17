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
            .use(namespace('dam_'))
            .toString()
            .trim(),
            expected = read('test/expected/namespace.expected.css', 'utf8')
                .toString()
                .trim();
        assert.equal(actual, expected, 'Output should match expected namespaced result');
    });

    it('should not add namespace by default', function() {
        var actual = rework(read('test/fixtures/namespace.fixture.css', 'utf8'))
            .use(namespace())
            .toString()
            .trim(),
            expected = read('test/expected/no.namespace.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match expected namespaced result');
    });

    it('should not add namespace by if empty string is passed as argument', function() {
        var actual = rework(read('test/fixtures/namespace.fixture.css', 'utf8'))
            .use(namespace(''))
            .toString()
            .trim(),
            expected = read('test/expected/no.namespace.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match expected namespaced result');
    });

    it('should add namespace to compound selector', function() {
        var actual = rework(read('test/fixtures/compound.selector.fixture.css', 'utf8'))
            .use(namespace('dam-'))
            .toString()
            .trim(),
            expected = read('test/expected/compound.selector.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match expected namespaced result on a compound selector');
    });

});
