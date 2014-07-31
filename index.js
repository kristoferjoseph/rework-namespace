/*
 * Appends a namespace to class names with 'string'
 *
 *
 * .button {
 *      color: black;
 *  }
 *
 *  yeilds:
 *
 *  .topcoat-button {
 *      color: black;
 *  }
 *
 */

// Returns true if a selector matches a test
function selectorMatchesTest(selector, test) {
    if (test instanceof RegExp) {
        return test.exec(selector);
    }
    else if (typeof test === 'string') {
        return selector === test;
    }
    return false;
}

// Returns true if a selector matches any test
function selectorMatchesTests(selector, tests, fallback) {
    // Convert strings to arrays
    if (typeof tests === 'string') tests = [tests];

    if (!tests || !tests.length) return fallback;

    return tests.some(function(test) {
        return selectorMatchesTest(selector, test);
    });
}

module.exports = function(ns, options) {
    options = options || {};

    // Returns true if a selector matches any inclusion test
    // Returns true if there are no inclusion test
    function shouldIncludeSelector(selector) {
        return selectorMatchesTests(selector, options.only, true);
    }

    // Returns true if a selector matches any exclusion test
    // Returns false if there are no exclusion test
    function shouldIgnoreSelector(selector) {
        return selectorMatchesTests(selector, options.not, false);
    }

    return function replace(style) {
        // Do nothing if namespace was not specified
        if (!ns || ns === '') return;

        style.rules = style.rules.map(function(rule) {
            if (rule && rule.type === 'media') {
              replace(rule);
              return rule;
            }

            if (!rule.selectors) return rule;

            rule.selectors = rule.selectors.map(function(selector) {
                if (shouldIgnoreSelector(selector) || !shouldIncludeSelector(selector)) return selector;
                return selector.replace(/\./g, '.' + ns + '-');
            });
            return rule;
        });
    };
};
