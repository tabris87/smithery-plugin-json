import { generate as intGenerate } from './astTools/generator.js';
import { fstToAst } from './astTools/transformer.js';

export class Generator {
    generate(sContent, mOptions) {
        const ast = fstToAst(sContent);
        return intGenerate(ast);
    }
}