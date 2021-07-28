import { expect } from 'chai';
import { FSTTerminal } from 'smithery/lib/utils/index.js';
import { Property } from './Property.js';

export default function () {
    describe('Check the conversion strategy for Property', () => {
        describe('Test the AST to FST conversion', () => {
            it(`Check correct FST transformation for empty Property ""`);
            it(`Check correct FST transformation for a string Property ""`);
            it(`Check correct FST transformation for a number Property ""`);
            it(`Check correct FST transformation for a boolean Property ""`);
            it(`Check correct FST transformation for a null Property ""`);
        });
        describe('Test the FST to AST conversion', () => {
            it(`Check correct AST transformation for empty Property ""`);
            it(`Check correct AST transformation for a string Property ""`);
            it(`Check correct AST transformation for a number Property ""`);
            it(`Check correct AST transformation for a boolean Property ""`);
            it(`Check correct AST transformation for a null Property ""`);
        });
    });
}