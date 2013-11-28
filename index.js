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

module.exports = function(str) {
    return function(style) {
        style.rules = style.rules.map(function(rule) {
            if (!rule.selectors) return rule;
            rule.selectors = rule.selectors.map(function(selector) {
                if (!str || str === '') return selector;
                return (selector.charAt(0) === '.' ? '.' + str + '-' + selector.substr(1) : selector);
            });
            return rule;
        });
    };
};
