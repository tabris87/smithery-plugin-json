import { expect } from 'chai';
import { FSTTerminal } from 'smithery/lib/utils/index.js';
import { ArrayExpression } from './ArrayExpression.js';


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
            expect(transformedFST).not.to.be.undefined;
            expect(transformedFST instanceof FSTTerminal).to.be.true;
            expect(transformedFST).to.be.eql(tempResultFST);
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
            expect(transformedFST).not.to.be.undefined;
            expect(transformedFST instanceof FSTTerminal).to.be.true;
            expect(transformedFST).to.be.eql(tempResultFST);
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
            expect(recreatedAST).not.to.be.undefined;
            expect(recreatedAST).to.be.eql(resultAST);
        });
    });
});