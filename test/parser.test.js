const parser = require('../lib/parser');
const {
    Node
} = require('featureJS/lib/utils/acorn-utils');

test('Check parser parses empty JSON object', () => {
    expect(parser.parse('{}')).toBeDefined();
});

test('Check parser parses empty JSON Array', () => {
    expect(parser.parse('[]')).toBeDefined();
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

    expect(parser.parse('{}')).toEqual(testNode);
});

test('Check parser parses empty JSON Array -> AST match', () => {
    const testNode = new Node();
    testNode.type = "ArrayExpression";
    testNode.start = 8;
    testNode.end = 10;
    testNode.elements = [];
    testNode.parent = undefined;
    testNode.path = "ArrayExpression";
    testNode.name = "root";

    expect(parser.parse('[]')).toEqual(testNode);
});

test('Check parser parses empty JSON string', () => {
    expect(() => parser.parse('').toThrowError(
        new Error('Invalid JSON input')
    ));
})