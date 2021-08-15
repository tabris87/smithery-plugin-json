import { expect } from 'chai';
import { FSTTerminal } from 'smithery/lib/utils/index.js';
import { Property } from './Property.js';

export default function () {
    describe('Check the conversion strategy for Property', () => {
        let strat = new Property();

        describe('Test the AST to FST conversion', () => {
            let rootAST;
            let tempResult;

            beforeEach('Setup AST', () => {
                //setup the base AST structure
                rootAST = {
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "test"
                    },
                    value: undefined
                };

                tempResult = new FSTTerminal("Property", "test");
                tempResult.setMergeStrategy('propertyCompose');
                tempResult.setCodeLanguage('json');
                tempResult.setParent();
                tempResult.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Identifier\",\"name\":\"test\"}}";
            });

            it(`Check correct FST transformation for empty Property ""`, () => {
                const result = strat.toFST(rootAST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct FST transformation for a string Property "Hello World"`, () => {
                rootAST.value = {
                    type: "Literal",
                    value: "Hello World",
                    raw: "\"Hello World\""
                };
                tempResult.setContent("\"Hello World\"");

                const result = strat.toFST(rootAST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct FST transformation for a number Property "1"`, () => {
                rootAST.value = {
                    type: "Literal",
                    value: 1,
                    raw: "1"
                };
                tempResult.setContent("1");

                const result = strat.toFST(rootAST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct FST transformation for a boolean Property true`, () => {
                rootAST.value = {
                    type: "Literal",
                    value: true,
                    raw: "true"
                };
                tempResult.setContent("true");

                const result = strat.toFST(rootAST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct FST transformation for a null Property null`, () => {
                rootAST.value = {
                    type: "Literal",
                    value: null,
                    raw: "null"
                };
                tempResult.setContent("null");

                const result = strat.toFST(rootAST);
                expect(result).to.be.eql(tempResult);
            });
        });

        describe('Test the FST to AST conversion', () => {
            let rootFST;
            let tempResult;

            beforeEach('Setup FST', () => {
                rootFST = new FSTTerminal("Property", "test");
                rootFST.setMergeStrategy('propertyCompose');
                rootFST.setCodeLanguage('json');
                rootFST.setParent();
                rootFST.originNode = "{\"type\":\"Property\",\"key\":{\"type\":\"Literal\",\"value\":\"test\",\"raw\":\"test\"}}";

                tempResult = {
                    type: "Property",
                    key: {
                        type: "Identifier",
                        name: "test"
                    },
                    value: undefined
                };
            });

            it(`Check correct AST transformation for empty Property ""`, () => {
                const result = strat.toAST(rootFST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a string Property "Hello World"`, () => {
                rootFST.setContent("\"Hello World\"");
                tempResult.value = {
                    type: "Literal",
                    value: "Hello World",
                    raw: "\"Hello World\""
                };

                const result = strat.toAST(rootFST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a number Property 1`, () => {
                rootFST.setContent("1");
                tempResult.value = {
                    type: "Literal",
                    value: 1,
                    raw: "1"
                };

                const result = strat.toAST(rootFST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a boolean Property true`, () => {
                rootFST.setContent("true");
                tempResult.value = {
                    type: "Literal",
                    value: true,
                    raw: "true"
                };

                const result = strat.toAST(rootFST);
                expect(result).to.be.eql(tempResult);
            });

            it(`Check correct AST transformation for a null Property null`, () => {
                rootFST.setContent("null");
                tempResult.value = {
                    type: "Literal",
                    value: null,
                    raw: "null"
                };

                const result = strat.toAST(rootFST);
                expect(result).to.be.eql(tempResult);
            });
        });
    });
}