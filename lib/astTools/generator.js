"use strict";
import * as escodegen from 'escodegen';

function generate(oAST) {
    const content = escodegen.generate(oAST);
    const obj = new Function(`return ${content}`).apply();
    return JSON.stringify(obj, null, 2);
}

export {
    generate
}