import * as espree from 'espree';

/* const mVisitorKeys = {
    ArrayExpression: ["elements"],
    ArrayPattern: ["elements"],
    ObjectExpression: ["properties"],
    ObjectPattern: ["properties"],
    Property: ["value", "key"],
    Literal: []
} */

function createAst(sCodeString, iECMAVersion) {
    try {
        return espree.parse(sCodeString, {
            range: false,
            loc: false,
            comment: true,
            tokens: true,
            ecmaVersion: iECMAVersion
        })
    } catch (error) {
        console.log(error);
    }
}

function prepareAst(oAST, oOptions) {
    delete oAST.end;
    delete oAST.start;

    espree.VisitorKeys[oAST.type].forEach((sChildKey) => {
        var childs = oAST[sChildKey];
        if (Array.isArray(childs)) {
            childs.forEach(c => {
                prepareAst(c, oOptions);
            })
        } else {
            prepareAst(childs, oOptions);
        }
    });
    return oAST;
}

function parse(sCodeString, oOptions) {
    //just check if we have correct json
    try {
        var sJSON = JSON.stringify(JSON.parse(sCodeString));
        sJSON = "var a = " + sJSON;

        //parse the 'javascript variable' and return the JSON part only
        var ast = createAst(sJSON, 5);
        ast = ast.body[0].declarations[0].init;

        ast = prepareAst(ast);
        return ast;
    } catch (oError) {
        throw new Error('Invalid JSON input');
    }
}

export {
    parse
}