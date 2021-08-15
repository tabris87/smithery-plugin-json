import { expect } from 'chai';
import { FSTTerminal } from 'smithery/lib/utils/index.js';
import { Literal } from './Literal.js';

export default function () {
    describe('Check the conversion strategy for Literal', () => {
        describe('Test the AST to FST conversion', () => {
            let rootAST;
            const literalStrategy = new Literal();

            beforeEach('Setup AST', () => {
                //setup the base AST structure
                rootAST = {
                    "type": "Literal",
                    "value": "",
                    "raw": ""
                };
            });

            it(`Check correct FST transformation for empty Literal ""`, () => {
                //setup the base FST structure
                const tempResultFST = new FSTTerminal('Literal', 'Literal_');
                tempResultFST.setMergeStrategy('override');
                tempResultFST.setCodeLanguage('json');
                tempResultFST.setContent("");
                tempResultFST.setParent();
                tempResultFST.originNode = "{\"type\":\"Literal\",\"value\":\"\",\"raw\":\"\"}";

                const transformedFST = literalStrategy.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a string Literal ("a")`, () => {
                //setup the base FST structure
                const tempResultFST = new FSTTerminal('Literal', 'Literal_a');
                tempResultFST.setMergeStrategy('override');
                tempResultFST.setCodeLanguage('json');
                tempResultFST.setContent("a");
                tempResultFST.setParent();
                tempResultFST.originNode = "{\"type\":\"Literal\",\"value\":\"a\",\"raw\":\"\\\"a\\\"\"}";

                rootAST.value = "a";
                rootAST.raw = "\"a\"";

                const transformedFST = literalStrategy.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a number Literal (2)`, () => {
                //setup the base FST structure
                const tempResultFST = new FSTTerminal('Literal', 'Literal_2');
                tempResultFST.setMergeStrategy('override');
                tempResultFST.setCodeLanguage('json');
                tempResultFST.setContent(2);
                tempResultFST.setParent();
                tempResultFST.originNode = "{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"}";
                tempResultFST.set

                rootAST.value = 2;
                rootAST.raw = "2";

                const transformedFST = literalStrategy.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a boolean Literal (true)`, () => {
                //setup the base FST structure
                const tempResultFST = new FSTTerminal('Literal', 'Literal_true');
                tempResultFST.setMergeStrategy('override');
                tempResultFST.setCodeLanguage('json');
                tempResultFST.setContent("true");
                tempResultFST.setParent();
                tempResultFST.originNode = "{\"type\":\"Literal\",\"value\":\"true\",\"raw\":\"true\"}";

                rootAST.value = "true";
                rootAST.raw = "true";

                const transformedFST = literalStrategy.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a boolean Literal (false)`, () => {
                //setup the base FST structure
                const tempResultFST = new FSTTerminal('Literal', 'Literal_false');
                tempResultFST.setMergeStrategy('override');
                tempResultFST.setCodeLanguage('json');
                tempResultFST.setContent("false");
                tempResultFST.setParent();
                tempResultFST.originNode = "{\"type\":\"Literal\",\"value\":\"false\",\"raw\":\"false\"}";

                rootAST.value = "false";
                rootAST.raw = "false";

                const transformedFST = literalStrategy.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });

            it(`Check correct FST transformation for a null Literal (null)`, () => {
                //setup the base FST structure
                const tempResultFST = new FSTTerminal('Literal', 'Literal_null');
                tempResultFST.setMergeStrategy('override');
                tempResultFST.setCodeLanguage('json');
                tempResultFST.setContent("null");
                tempResultFST.setParent();
                tempResultFST.originNode = "{\"type\":\"Literal\",\"value\":\"null\",\"raw\":\"null\"}";

                rootAST.value = "null";
                rootAST.raw = "null";

                const transformedFST = literalStrategy.toFST(rootAST);
                expect(transformedFST).to.be.eql(tempResultFST);
            });
        });
        describe('Test the FST to AST conversion', () => {
            let rootFST;
            const literalStrategy = new Literal();

            beforeEach('Setup AST', () => {
                //setup the base AST structure
                rootFST = new FSTTerminal('Literal', 'root');
                rootFST.setMergeStrategy('override');
                rootFST.setCodeLanguage('json');
                rootFST.setContent("");
                rootFST.setParent();
                rootFST.originNode = "{\"type\":\"Literal\",\"value\":\"\",\"raw\":\"\"}";
            });

            it(`Check correct AST transformation for empty Literal ""`, () => {
                const tempResultAST = {
                    "type": "Literal",
                    "value": "",
                    "raw": ""
                };

                const transformedAST = literalStrategy.toAST(rootFST);
                expect(transformedAST).to.be.eql(tempResultAST);
            });

            it(`Check correct AST transformation for a string Literal ("a")`, () => {
                const tempResultAST = {
                    "type": "Literal",
                    "value": "a",
                    "raw": "\"a\""
                };

                rootFST.setContent("a");

                const transformedAST = literalStrategy.toAST(rootFST);
                expect(transformedAST).to.be.eql(tempResultAST);
            });

            it(`Check correct AST transformation for a number Literal (2)`, () => {
                const tempResultAST = {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                };

                rootFST.setContent(2);

                const transformedAST = literalStrategy.toAST(rootFST);
                expect(transformedAST).to.be.eql(tempResultAST);
            });

            it(`Check correct AST transformation for a boolean Literal (true)`, () => {
                const tempResultAST = {
                    "type": "Literal",
                    "value": "true",
                    "raw": "true"
                };

                rootFST.setContent("true");

                const transformedAST = literalStrategy.toAST(rootFST);
                expect(transformedAST).to.be.eql(tempResultAST);
            });

            it(`Check correct AST transformation for a boolean Literal (false)`, () => {
                const tempResultAST = {
                    "type": "Literal",
                    "value": "false",
                    "raw": "false"
                };

                rootFST.setContent("false");

                const transformedAST = literalStrategy.toAST(rootFST);
                expect(transformedAST).to.be.eql(tempResultAST);
            });

            it(`Check correct AST transformation for a null Literal (null)`, () => {
                const tempResultAST = {
                    "type": "Literal",
                    "value": "null",
                    "raw": "null"
                };

                rootFST.setContent("null");

                const transformedAST = literalStrategy.toAST(rootFST);
                expect(transformedAST).to.be.eql(tempResultAST);
            });
        });
    });
}