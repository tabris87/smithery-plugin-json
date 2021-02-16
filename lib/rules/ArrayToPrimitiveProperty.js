"use strict";

const rule = {
    apply: function (baseFST, featureFST, oContext) {
        featureFST.parent = baseFST.parent;
        return featureFST;
    },
    target: ['json'],
    selector: 'Property[value]>ArrayExpression',
    selectorFeature: 'Property[value]>Literal'
};

module.exports = rule;