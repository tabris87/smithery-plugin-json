import * as espree from 'espree';
import * as escodegen from 'escodegen';

const exp = "var a = [[\"a\",\"b\",\"c\",\"d\"], [1,2,3,4], [{hello: \"World\"}, {say: 2}, {return: false}]]";
const oAST = {
    type: "ArrayExpression",
    elements: [
        {
            type: "ObjectExpression",
            properties: [
                {
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "hello"
                    },
                    value: {
                        type: "Literal",
                        value: "World",
                        raw: "\"World\""
                    },
                    kind: "init"
                }
            ]
        },
        {
            type: "ObjectExpression",
            properties: [
                {
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "say"
                    },
                    value: {
                        type: "Literal",
                        value: 2,
                        raw: "2"
                    },
                    kind: "init"
                }
            ]
        },
        {
            type: "ObjectExpression",
            properties: [
                {
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "return"
                    },
                    value: {
                        type: "Literal",
                        value: false,
                        raw: "false"
                    },
                    kind: "init"
                }
            ]
        }
    ]
};

const ast = espree.parse(exp);
const tempContent = escodegen.generate(oAST)

debugger;

console.log('tested')