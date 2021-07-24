import { parse as intParse } from './astTools/parser.js';
import { astToFst } from './astTools/transformer.js';

export class Parser {
    parse(sContent, mOptions) {
        const ast = intParse(sContent, mOptions);
        const fst = astToFst(ast, mOptions);
        return fst;
    }
}