"use strict";

const rule = {
    resolve: function (baseFST, featureFST, oContext) {
        featureFST.parent = baseFST.parent;
        return featureFST;
    },
    target: ['json'],
    selector: 'Property[value]>Literal'
};

module.exports = rule;