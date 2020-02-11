const generator = require('../lib/generator');
const {
    Node
} = require('featureJS/lib/utils/acorn-utils');

test('Check parser parses empty JSON Array -> AST match', () => {
    const testNode = new Node();
    testNode.type = "ArrayExpression";
    testNode.start = 8;
    testNode.end = 10;
    testNode.elements = [];
    testNode.parent = undefined;
    testNode.path = "ArrayExpression";
    testNode.name = "root";

    expect(generator.generate(testNode)).toEqual('[]');
});

test('Check parser parses empty JSON Object -> AST match', () => {
    const testNode = new Node();
    testNode.type = "ObjectExpression";
    testNode.start = 8;
    testNode.end = 10;
    testNode.properties = [];
    testNode.parent = undefined;
    testNode.path = "ObjectExpression";
    testNode.name = "root";

    expect(generator.generate(testNode)).toEqual('{}');
});