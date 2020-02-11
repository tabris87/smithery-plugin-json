"use strict";

const espree = require('espree');
const mVisitorKeys = {
    ArrayExpression: ["elements"],
    ArrayPattern: ["elements"],
    ObjectExpression: ["properties"],
    ObjectPattern: ["properties"],
    //removed key, because used as name identifier
    Property: ["value"],
    Literal: []
}

function createAst(sCodeString, iECMAVersion) {
    try {
        return espree.parse(sCodeString, {
            range: false,
            loc: false,
            comment: true,
            tokens: false,
            ecmaVersion: iECMAVersion
        })
    } catch (error) {
        console.log(error);
    }
}

function parse(sCodeString, oOptions) {
    //just check if we have correct json
    try {
        var sJSON = JSON.stringify(JSON.parse(sCodeString));
        sJSON = "var a = " + sJSON;

        //parse the 'javascript variable' and return the JSON part only
        var ast = createAst(sJSON, 5);
        ast = ast.body[0].declarations[0].init;

        ast = prepareAst(ast)
        debugger;
        return ast;
    } catch (oError) {
        //console.trace(oError);
        throw new Error('Invalid JSON input');
    }
}

function prepareAst(oAST, oOptions) {
    if (oOptions && oOptions.parent) {
        oAST.parent = oOptions.parent;
        oAST.path = oOptions.parent.path !== "" ? oOptions.parent.path + "." + oAST.type : oAST.type;
    } else {
        oAST.parent = undefined;
        oAST.path = oAST.type;
        oAST.name = "root";
        oOptions = {};
    }

    if (oAST.type === "Property") {
        oAST.name = oAST.key.value;
        oOptions.parent = oAST;
    } else if (oAST.type === "Literal") {
        //TODO: rule für type literal mit parent property!!!
        oAST.name = oAST.value;
    } else if (oAST.type === "ArrayExpression") {
        if (typeof oOptions.index === "undefined") {
            oAST.name = oAST.parent ? oAST.parent.name : "root";
        } else {
            oAST.name = oAST.parent.name + "[" + oOptions.index + "]";
        }
    } else if (oAST.type === "ObjectExpression") {
        if (typeof oOptions.index === "undefined") {
            oAST.name = oAST.parent ? oAST.parent.name : "root";
        } else {
            oAST.name = oAST.parent.name + "[" + oOptions.index + "]";
        }
    } else {
        if (!(oAST.name && oAST.name !== "")) {
            oAST.name = oAST.parent.name;
        }
    }

    mVisitorKeys[oAST.type].forEach((sChildKey) => {
        var vChild = oAST[sChildKey];
        if (Array.isArray(vChild)) {
            vChild.forEach((oChild, index) => {
                oOptions.parent = oAST;
                if (oAST.type === "ArrayExpression") {
                    oOptions.index = index;
                } else {
                    delete oOptions.index;
                }
                prepareAst(oChild, oOptions);
            })
        } else {
            oOptions.parent = oAST;
            prepareAst(vChild, oOptions);
        }
    });
    return oAST;
}

module.exports = {
    parse: parse,
    visitorKeys: mVisitorKeys
}