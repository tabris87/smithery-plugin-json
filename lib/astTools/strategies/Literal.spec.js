import { expect } from 'chai';
import { FSTTerminal } from 'smithery/lib/utils/index.js';
import { Literal } from '../../../lib/astTools/strategies/Literal.js';


describe('Check the conversion strategy for Literal', () => {
    describe('Test the AST to FST conversion', () => {
        it(`Check correct FST transformation for empty Literal ""`);
        it(`Check correct FST transformation for a string Literal ""`);
        it(`Check correct FST transformation for a number Literal ""`);
        it(`Check correct FST transformation for a boolean Literal ""`);
        it(`Check correct FST transformation for a null Literal ""`);
    });
    describe('Test the FST to AST conversion', () => {
        it(`Check correct AST transformation for empty Literal ""`);
        it(`Check correct AST transformation for a string Literal ""`);
        it(`Check correct AST transformation for a number Literal ""`);
        it(`Check correct AST transformation for a boolean Literal ""`);
        it(`Check correct AST transformation for a null Literal ""`);
    });
});