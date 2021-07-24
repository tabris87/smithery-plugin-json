import { parse } from './lib/astTools/parser.js';
import { generate } from './lib/astTools/generator.js';
import { astToFst, fstToAst } from './lib/astTools/transformer.js';

const jsonStringLevel1 = '{"array": ["1", ["2"]]}';
const jsonStringLevel2 = '["1", ["2"]]';
const astLevel1 = parse(jsonStringLevel1);
const astLevel2 = parse(jsonStringLevel2);
const transformedLevel1 = astToFst(astLevel1);
const transformedLevel2 = astToFst(astLevel2);

console.log('Trans1: ')
console.log(transformedLevel1);
console.log('--------------------');

console.log('Trans2: ')
console.log(transformedLevel2);

const astBackLevel1 = fstToAst(transformedLevel1);
const astBackLevel2 = fstToAst(transformedLevel2)

console.log('--------------------');
console.log('Gen-AST1: ')
console.log(generate(astBackLevel1));
console.log('....................');
console.log('Gen-AST2: ')
console.log(generate(astBackLevel2));