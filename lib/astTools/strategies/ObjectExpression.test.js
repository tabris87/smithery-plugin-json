import { expect } from 'chai';
import { FSTNonTerminal, FSTTerminal } from 'smithery/lib/utils/index.js';
import { ObjectExpression } from './ObjectExpression.js';

export default function () {
    describe('Check the conversion strategy for ObjectExpression', () => {
        const strat = new ObjectExpression();

        describe('Test the AST to FST conversion', () => {
            let rootAST;
            let tempResultFST;

            beforeEach('Setup AST', () => {
                rootAST = {
                    type: "ObjectExpression",
                    properties: []
                };

                tempResultFST = new FSTNonTerminal("ObjectExpression", "root");
                tempResultFST.setParent();
                tempResultFST.originNode = "{\"type\":\"ObjectExpression\"}";
            });

            it(`Check correct FST transformation for empty ObjectExpression ""`, () => {
                const transformedFST = strat.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a string ObjectExpression "{"hello": "World"}"`, () => {
                rootAST.properties.push({
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
                });

                const textChild = new FSTTerminal('Property', 'hello');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("\"World\"");
                textChild.setParent(tempResultFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"hello\"},\"kind\":\"init\"}";

                tempResultFST.addChild(textChild);

                const transformedFST = strat.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a number ObjectExpression "{"say": 2}"`, () => {
                rootAST.properties.push({
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
                });

                const textChild = new FSTTerminal('Property', 'say');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("2");
                textChild.setParent(tempResultFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"say\"},\"kind\":\"init\"}";

                tempResultFST.addChild(textChild);

                const transformedFST = strat.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a boolean ObjectExpression "{"toBe": true}"`, () => {
                rootAST.properties.push({
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "toBe"
                    },
                    value: {
                        type: "Literal",
                        value: true,
                        raw: "true"
                    },
                    kind: "init"
                });

                const textChild = new FSTTerminal('Property', 'toBe');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("true");
                textChild.setParent(tempResultFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"toBe\"},\"kind\":\"init\"}";

                tempResultFST.addChild(textChild);

                const transformedFST = strat.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a null ObjectExpression "{"its": null}"`, () => {
                rootAST.properties.push({
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "its"
                    },
                    value: {
                        type: "Literal",
                        value: null,
                        raw: "null"
                    },
                    kind: "init"
                });

                const textChild = new FSTTerminal('Property', 'its');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("null");
                textChild.setParent(tempResultFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"its\"},\"kind\":\"init\"}";

                tempResultFST.addChild(textChild);

                const transformedFST = strat.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });
        });

        describe('Test the FST to AST conversion', () => {
            let rootFST;
            let tempResult;

            beforeEach('Setup FST', () => {
                tempResult = {
                    type: "ObjectExpression",
                    properties: []
                };

                rootFST = new FSTNonTerminal("ObjectExpression", "root");
                rootFST.setParent();
                rootFST.originNode = "{\"type\":\"ObjectExpression\"}";
            });

            it(`Check correct AST transformation for empty ObjectExpression ""`, () => {
                const transformedFST = strat.toAST(rootFST);
                expect(transformedFST).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a string ObjectExpression "{"hello": "World"}"`, () => {
                const textChild = new FSTTerminal('Property', 'hello');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("\"World\"");
                textChild.setParent(rootFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"hello\"},\"kind\":\"init\"}";

                rootFST.addChild(textChild);

                tempResult.properties.push({
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "hello"
                    },
                    value: {
                        type: "Literal",
                        value: "World",
                        raw: "\"World\""
                    }
                });

                const transformedFST = strat.toAST(rootFST);
                expect(transformedFST).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a number ObjectExpression "{"say": 2}"`, () => {
                const textChild = new FSTTerminal('Property', 'say');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("2");
                textChild.setParent(rootFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"say\"},\"kind\":\"init\"}";

                rootFST.addChild(textChild);

                tempResult.properties.push({
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "say"
                    },
                    value: {
                        type: "Literal",
                        value: 2,
                        raw: "2"
                    }
                });

                const transformedFST = strat.toAST(rootFST);
                expect(transformedFST).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a boolean ObjectExpression "{"toBe": true}"`, () => {
                const textChild = new FSTTerminal('Property', 'toBe');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("true");
                textChild.setParent(rootFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"toBe\"},\"kind\":\"init\"}";

                rootFST.addChild(textChild);

                tempResult.properties.push({
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "toBe"
                    },
                    value: {
                        type: "Literal",
                        value: true,
                        raw: "true"
                    }
                });

                const transformedFST = strat.toAST(rootFST);
                expect(transformedFST).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a null ObjectExpression "{"its": null}"`, () => {
                const textChild = new FSTTerminal('Property', 'its');
                textChild.setMergeStrategy('propertyCompose');
                textChild.setCodeLanguage('json');
                textChild.setContent("null");
                textChild.setParent(rootFST);
                textChild.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"its\"},\"kind\":\"init\"}";

                rootFST.addChild(textChild);

                tempResult.properties.push({
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "its"
                    },
                    value: {
                        type: "Literal",
                        value: null,
                        raw: "null"
                    }
                });

                const transformedFST = strat.toAST(rootFST);
                expect(transformedFST).to.be.eql(tempResult);
            });
        });
    });
}