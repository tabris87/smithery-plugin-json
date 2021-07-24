"use strict";
import * as escodegen from 'escodegen';

function generate(oAST) {
    return escodegen.generate(oAST)/* .replace(/"/g, '\"').replace(/'/g, '"') */;
}

export {
    generate
}