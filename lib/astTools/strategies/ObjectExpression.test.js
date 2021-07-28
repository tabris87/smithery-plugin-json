import { expect } from 'chai';
import { FSTTerminal } from 'smithery/lib/utils/index.js';
import { ObjectExpression } from './ObjectExpression.js';

export default function () {
    describe('Check the conversion strategy for ObjectExpression', () => {
        describe('Test the AST to FST conversion', () => {
            it(`Check correct FST transformation for empty ObjectExpression ""`);
            it(`Check correct FST transformation for a string ObjectExpression ""`);
            it(`Check correct FST transformation for a number ObjectExpression ""`);
            it(`Check correct FST transformation for a boolean ObjectExpression ""`);
            it(`Check correct FST transformation for a null ObjectExpression ""`);
        });
        describe('Test the FST to AST conversion', () => {
            it(`Check correct AST transformation for empty ObjectExpression ""`);
            it(`Check correct AST transformation for a string ObjectExpression ""`);
            it(`Check correct AST transformation for a number ObjectExpression ""`);
            it(`Check correct AST transformation for a boolean ObjectExpression ""`);
            it(`Check correct AST transformation for a null ObjectExpression ""`);
        });
    });
}