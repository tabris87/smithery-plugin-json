"use strict";
const escodegen = require('escodegen');

function generate(oAST) {
    return JSON.stringify(escodegen.generate(oAST));
}

module.exports = {
    generate: generate
}