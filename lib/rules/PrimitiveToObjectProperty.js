"use strict";

const rule = {
    apply: function (baseFST, featureFST, oContext) {
        featureFST.parent = baseFST.parent;
        return featureFST;
    },
    target: ['json'],
    selector: 'Property[value]>Literal',
    selectorFeature: 'Property[value]>ObjectExpression'
};

module.exports = rule;