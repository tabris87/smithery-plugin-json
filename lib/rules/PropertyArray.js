"use strict";

const rule = {
    resolve: function (baseFST, featureFST, oContext) {
        baseFST.elements = baseFST.elements.concat(featureFST.elements);
        return baseFST;
    },
    target: ['json'],
    selector: 'Property>ArrayExpression',
    selectorFeature: 'Property>ArrayExpression'
};

module.exports = rule;