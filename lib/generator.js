"use strict";
const escodegen = require('escodegen');

function generate(oAST) {
    return escodegen.generate(oAST).replace(/"/g, '\"').replace(/'/g, '"');
}

module.exports = {
    generate: generate
}