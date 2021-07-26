import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { FSTTerminal } from 'smithery/lib/utils/index.js';
import { ArrayExpression } from './ArrayExpression.js';

import { Generator as GeneratorOwn } from '../../../lib/generator.js';
import { Parser as ParserOwn } from '../../../lib/parser.js';

chai.use(chaiExclude);

const ownGen = new GeneratorOwn();
const ownPar = new ParserOwn();

const formatResult = (sResultString) => {
    return ownGen.generate(ownPar.parse(sResultString));
}

describe('Check the conversion strategy for ArrayExpressions', () => {
    describe('Test the AST to FST conversion', () => {
        let rootAST;
        let tempResultFST;
        const arrayExpStrategy = new ArrayExpression();

        beforeEach('Setup AST', () => {
            //setup the base AST structure
            rootAST = {
                "type": "ArrayExpression",
                "start": 0,
                "end": 1,
                "elements": []
            };

            //setup the base FST structure
            tempResultFST = new FSTTerminal('ArrayExpression', 'root');
            tempResultFST.setMergeStrategy('listConcat');
            tempResultFST.setCodeLanguage('json');
        });

        it(`Successfull FST transformation for an empty ArrayExpression ('[]')`, () => {
            tempResultFST.setContent([]);
            tempResultFST.setParent();
            tempResultFST.originNode = "{\"type\":\"ArrayExpression\"}";

            const transformedFST = arrayExpStrategy.toFST(rootAST);
            chai.expect(transformedFST).not.to.be.undefined;
            chai.expect(transformedFST instanceof FSTTerminal).to.be.true;
            chai.expect(transformedFST).to.be.eql(tempResultFST);
        });

        it(`Successfull FST transformation for an ArrayExpression filled by numbers ('[1,2,3,4]')`, () => {
            tempResultFST.setContent(["1", "2", "3", "4"]);
            tempResultFST.setParent();
            tempResultFST.originNode = "{\"type\":\"ArrayExpression\"}";

            rootAST.elements.push({
                "type": "Literal",
                "value": 1,
                "raw": "1"
            });
            rootAST.elements.push({
                "type": "Literal",
                "value": 2,
                "raw": "2"
            });
            rootAST.elements.push({
                "type": "Literal",
                "value": 3,
                "raw": "3"
            });
            rootAST.elements.push({
                "type": "Literal",
                "value": 4,
                "raw": "4"
            });

            const transformedFST = arrayExpStrategy.toFST(rootAST);
            chai.expect(transformedFST).not.to.be.undefined;
            chai.expect(transformedFST instanceof FSTTerminal).to.be.true;
            chai.expect(transformedFST).to.be.eql(tempResultFST);
        });

        it(`Successfull FST transformation for an ArrayExpression filled by strings ('["a","b","c","d"]')`, () => {

            tempResultFST.setContent(["\"a\"", "\"b\"", "\"c\"", "\"d\""]);
            tempResultFST.setParent();
            tempResultFST.originNode = "{\"type\":\"ArrayExpression\"}";

            rootAST.elements.push({
                "type": "Literal",
                "value": "a",
                "raw": "'a'"
            });
            rootAST.elements.push({
                "type": "Literal",
                "value": "b",
                "raw": "'b'"
            });
            rootAST.elements.push({
                "type": "Literal",
                "value": "c",
                "raw": "'c'"
            });
            rootAST.elements.push({
                "type": "Literal",
                "value": "d",
                "raw": "'d'"
            });

            const transformedFST = arrayExpStrategy.toFST(rootAST);
            chai.expect(transformedFST).not.to.be.undefined;
            chai.expect(transformedFST instanceof FSTTerminal).to.be.true;
            chai.expect(transformedFST).to.be.eql(tempResultFST);
        });

        it(`Successfull FST transformation for an ArrayExpression filled by objects ("[{\"hello\": \"World\"}, {\"say\": 2}, {\"return\": false}]")`, () => {

            tempResultFST.setContent(["{\n  \"hello\": \"World\"\n}", "{\n  \"say\": 2\n}", "{\n  \"return\": false\n}"]);
            tempResultFST.setParent();
            tempResultFST.originNode = "{\"type\":\"ArrayExpression\"}";

            rootAST.elements.push({
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
            });
            rootAST.elements.push({
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
            });
            rootAST.elements.push({
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
            });

            const transformedFST = arrayExpStrategy.toFST(rootAST);
            chai.expect(transformedFST).not.to.be.undefined;
            chai.expect(transformedFST instanceof FSTTerminal).to.be.true;
            chai.expect(transformedFST).to.be.eql(tempResultFST);
        });

        it(`Successfull FST transformation for an ArrayExpression filled by Arrays ('[["a","b","c","d"], [1,2,3,4], [{\"hello\": \"World\"}, {\"say\": 2}, {\"return\": false}]]')`, () => {

            tempResultFST.setContent([
                "[\n  \"a\",\n  \"b\",\n  \"c\",\n  \"d\"\n]",
                "[\n  1,\n  2,\n  3,\n  4\n]",
                "[\n  {\n    \"hello\": \"World\"\n  },\n  {\n    \"say\": 2\n  },\n  {\n    \"return\": false\n  }\n]"
            ]);
            tempResultFST.setParent();
            tempResultFST.originNode = "{\"type\":\"ArrayExpression\"}";

            rootAST.elements.push({
                type: "ArrayExpression",
                elements: [
                    {
                        type: "Literal",
                        value: "a",
                        raw: "\"a\""
                    },
                    {
                        type: "Literal",
                        value: "b",
                        raw: "\"b\""
                    },
                    {
                        type: "Literal",
                        value: "c",
                        raw: "\"c\""
                    },
                    {
                        type: "Literal",
                        value: "d",
                        raw: "\"d\""
                    }
                ]
            });
            rootAST.elements.push({
                type: "ArrayExpression",
                elements: [
                    {
                        type: "Literal",
                        value: 1,
                        raw: "1"
                    },
                    {
                        type: "Literal",
                        value: 2,
                        raw: "2"
                    },
                    {
                        type: "Literal",
                        value: 3,
                        raw: "3"
                    },
                    {
                        type: "Literal",
                        value: 4,
                        raw: "4"
                    }
                ]
            });
            rootAST.elements.push({
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
            });

            const transformedFST = arrayExpStrategy.toFST(rootAST);
            chai.expect(transformedFST).not.to.be.undefined;
            chai.expect(transformedFST instanceof FSTTerminal).to.be.true;
            chai.expect(transformedFST).to.be.eql(tempResultFST);
        });
    });

    describe('Test the FST to AST conversion', () => {
        let resultAST;
        let rootFST;
        const arrayExpStrategy = new ArrayExpression();

        beforeEach('Setup AST', () => {
            //setup the base AST structure
            resultAST = {
                "type": "ArrayExpression",
                "elements": []
            };

            //setup the base FST structure
            rootFST = new FSTTerminal('ArrayExpression', 'root');
            rootFST.setMergeStrategy('listConcat');
            rootFST.setCodeLanguage('json');
        });

        it(`Successfull AST transformation for an empty ArrayExpression ('[]')`, () => {
            rootFST.setContent([]);
            rootFST.setParent();
            rootFST.originNode = "{\"type\":\"ArrayExpression\"}";

            const recreatedAST = arrayExpStrategy.toAST(rootFST);
            chai.expect(recreatedAST).not.to.be.undefined;
            chai.expect(recreatedAST).to.be.eql(resultAST);
        });

        it(`Successfull AST transformation for an ArrayExpression filled by numbers ('[1,2,3,4]')`, () => {
            rootFST.setContent(["1", "2", "3", "4"]);
            rootFST.setParent();
            rootFST.originNode = "{\"type\":\"ArrayExpression\"}";

            resultAST.elements.push({
                "type": "Literal",
                "value": 1,
                "raw": "1"
            });
            resultAST.elements.push({
                "type": "Literal",
                "value": 2,
                "raw": "2"
            });
            resultAST.elements.push({
                "type": "Literal",
                "value": 3,
                "raw": "3"
            });
            resultAST.elements.push({
                "type": "Literal",
                "value": 4,
                "raw": "4"
            });

            const recreatedAST = arrayExpStrategy.toAST(rootFST);
            chai.expect(recreatedAST).not.to.be.undefined;
            chai.expect(recreatedAST).excluding('start').excluding('end').to.deep.equal(resultAST);
        });

        it(`Successfull AST transformation for an ArrayExpression filled by strings ('["a","b","c","d"]')`, () => {
            rootFST.setContent(["'a'", "'b'", "'c'", "'d'"]);
            rootFST.setParent();
            rootFST.originNode = "{\"type\":\"ArrayExpression\"}";

            resultAST.elements.push({
                "type": "Literal",
                "value": "a",
                "raw": "\"a\""
            });
            resultAST.elements.push({
                "type": "Literal",
                "value": "b",
                "raw": "\"b\""
            });
            resultAST.elements.push({
                "type": "Literal",
                "value": "c",
                "raw": "\"c\""
            });
            resultAST.elements.push({
                "type": "Literal",
                "value": "d",
                "raw": "\"d\""
            });

            const recreatedAST = arrayExpStrategy.toAST(rootFST);
            chai.expect(recreatedAST).not.to.be.undefined;
            chai.expect(recreatedAST).excluding('start').excluding('end').to.deep.equal(resultAST);
        });

        it(`Successfull AST transformation for an ArrayExpression filled by objects ('[{"hello": "World"}, {"say": 2}, {"return": false}]')`, () => {

            rootFST.setContent(["{ \"hello\": \"World\" }", "{ \"say\": 2 }", "{ \"return\": false }"]);
            rootFST.setParent();
            rootFST.originNode = "{\"type\":\"ArrayExpression\"}";

            resultAST.elements.push({
                type: "ObjectExpression",
                properties: [
                    {
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: "hello",
                            raw: "\"hello\""
                        },
                        value: {
                            type: "Literal",
                            value: "World",
                            raw: "\"World\""
                        },
                        kind: "init"
                    }
                ]
            });
            resultAST.elements.push({
                type: "ObjectExpression",
                properties: [
                    {
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: "say",
                            raw: "\"say\""
                        },
                        value: {
                            type: "Literal",
                            value: 2,
                            raw: "2"
                        },
                        kind: "init"
                    }
                ]
            });
            resultAST.elements.push({
                type: "ObjectExpression",
                properties: [
                    {
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: "return",
                            raw: "\"return\""
                        },
                        value: {
                            type: "Literal",
                            value: false,
                            raw: "false"
                        },
                        kind: "init"
                    }
                ]
            });

            const recreatedAST = arrayExpStrategy.toAST(rootFST);
            chai.expect(recreatedAST).not.to.be.undefined;
            chai.expect(recreatedAST).excluding('start').excluding('end').to.deep.equal(resultAST);
        });

        it(`Successfull AST transformation for an ArrayExpression filled by by Arrays ('[["a","b","c","d"], [1,2,3,4], [{"hello": "World"}, {"say": 2}, {"return": false}]]')`, () => {

            rootFST.setContent([
                "[\n    'a',\n    'b',\n    'c',\n    'd'\n]",
                "[\n    1,\n    2,\n    3,\n    4\n]",
                "[\n    { \"hello\": \"World\" },\n    { \"say\": 2 },\n    { \"return\": false }\n]"
            ]);
            rootFST.setParent();
            rootFST.originNode = "{\"type\":\"ArrayExpression\"}";

            resultAST.elements.push({
                type: "ArrayExpression",
                elements: [
                    {
                        type: "Literal",
                        value: "a",
                        raw: "\"a\""
                    },
                    {
                        type: "Literal",
                        value: "b",
                        raw: "\"b\""
                    },
                    {
                        type: "Literal",
                        value: "c",
                        raw: "\"c\""
                    },
                    {
                        type: "Literal",
                        value: "d",
                        raw: "\"d\""
                    }
                ]
            });
            resultAST.elements.push({
                type: "ArrayExpression",
                elements: [
                    {
                        type: "Literal",
                        value: 1,
                        raw: "1"
                    },
                    {
                        type: "Literal",
                        value: 2,
                        raw: "2"
                    },
                    {
                        type: "Literal",
                        value: 3,
                        raw: "3"
                    },
                    {
                        type: "Literal",
                        value: 4,
                        raw: "4"
                    }
                ]
            });
            resultAST.elements.push({
                type: "ArrayExpression",
                elements: [
                    {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    raw: "\"hello\"",
                                    type: "Literal",
                                    value: "hello"
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
                                    raw: "\"say\"",
                                    type: "Literal",
                                    value: "say"
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
                                    raw: "\"return\"",
                                    type: "Literal",
                                    value: "return"
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
            });

            const recreatedAST = arrayExpStrategy.toAST(rootFST);
            chai.expect(recreatedAST).not.to.be.undefined;
            chai.expect(recreatedAST).excluding('start').excluding('end').to.deep.equal(resultAST);
        });
    });
});