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

    it('should add the namespace to selectors inside of mediaqueries.', function() {
        var actual = rework(read('test/fixtures/mediaquery.fixture.css', 'utf8'))
            .use(namespace('dam'))
            .toString()
            .trim(),
            expected = read('test/expected/mediaquery.expected.css', 'utf8')
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
            .use(namespace('dam'))
            .toString()
            .trim(),
            expected = read('test/expected/compound.selector.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match expected namespaced result on a compound selector');
    });

    it('should not add namespace for excluded selectors with regex', function() {
        var actual = rework(read('test/fixtures/filter.selector.fixture.css', 'utf8'))
            .use(namespace('s', {
                not: [/icon/]
            }))
            .toString()
            .trim(),
            expected = read('test/expected/filter.selector.only-buttons.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match when excluding selectors with regex');
    });

    it('should not add namespace for excluded selectors with string', function() {
        var actual = rework(read('test/fixtures/filter.selector.fixture.css', 'utf8'))
            .use(namespace('s', {
                not: [
                    '.icon',
                    '.icon-triangle-up:before',
                    '.icon-triangle-down:before'
                ]
            }))
            .toString()
            .trim(),
            expected = read('test/expected/filter.selector.only-buttons.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match when excluding selectors with string');
    });

    it('should not add namespace for excluded selectors with mixed regex and string', function() {
        var fixture = read('test/fixtures/filter.selector.fixture.css', 'utf8');
        var actual = rework(fixture)
            .use(namespace('s', {
                not: [
                    /icon/,
                    '.button',
                    '.toolbar-button'
                ]
            }))
            .toString()
            .trim(),
            expected = fixture // Input matches output
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match when excluding selectors with mixed regex and string');
    });

    it('should only add namespace for included selectors with regex', function() {
        var actual = rework(read('test/fixtures/filter.selector.fixture.css', 'utf8'))
            .use(namespace('s', {
                only: [/icon/]
            }))
            .toString()
            .trim(),
            expected = read('test/expected/filter.selector.not-buttons.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match when including selectors with regex');
    });

    it('should only add namespace for included selectors with strings', function() {
        var actual = rework(read('test/fixtures/filter.selector.fixture.css', 'utf8'))
            .use(namespace('s', {
                only: [
                    '.icon',
                    '.icon-triangle-up:before',
                    '.icon-triangle-down:before'
                ]
            }))
            .toString()
            .trim(),
            expected = read('test/expected/filter.selector.not-buttons.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match when including selectors with strings');
    });

    it('should only add namespace for included selectors with mixed regex and strings', function() {
        var actual = rework(read('test/fixtures/filter.selector.fixture.css', 'utf8'))
            .use(namespace('s', {
                only: [
                    /icon/,
                    '.button',
                    '.toolbar-button'
                ]
            }))
            .toString()
            .trim(),
            expected = read('test/expected/filter.selector.all.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match when including selectors with mixed regex and strings');
    });

    it('should only add namespace for included selectors that do not match excluded selectors', function() {
        var actual = rework(read('test/fixtures/filter.selector.fixture.css', 'utf8'))
            .use(namespace('s', {
                only: [
                    /icon/,
                    /button/
                ],
                not: [
                    '.toolbar-button'
                ]
            }))
            .toString()
            .trim(),
            expected = read('test/expected/filter.selector.not-toolbar-button.expected.css', 'utf8')
                .toString()
                .trim();

        assert.equal(actual, expected, 'Output should match when including/excluding selectors overlapping selectors');
    });
});
