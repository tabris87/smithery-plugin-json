import * as rules from './lib/rules/index.js';
import { Parser } from './lib/parser.js';
import { Generator } from './lib/generator.js';


export const a = {
    rules,
    parser: {
        fileEnding: "json",
        parser: Parser
    },
    generator: {
        fileEnding: "json",
        generator: Generator
    }
    /* ,
        dependencies: [] */
    /* {
        pluginName: "",
        version: ""
    } */
}