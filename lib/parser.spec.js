import { assert, expect } from "chai";

import { FSTTerminal, FSTNonTerminal } from 'smithery/lib/utils/index.js';

import { Parser } from './parser.js';

describe('Test the parser for correct FST creation', () => {
    const jsonParser = new Parser();
    describe('Check empty JSON root element parsing', () => {
        it('Check parser parses empty JSON object "{}"', () => {
            const resultFST = new FSTNonTerminal('ObjectExpression', 'root');
            resultFST.setParent();
            resultFST.originNode = "{\"type\":\"ObjectExpression\"}";

            const parsingResult = jsonParser.parse('{}');
            expect(parsingResult).not.to.be.undefined;
            expect(parsingResult).to.be.eql(resultFST);
        });

        it('Check parser parses empty JSON array "[]"', () => {
            const resultFST = new FSTTerminal('ArrayExpression', 'root');
            resultFST.setParent();
            resultFST.setCodeLanguage('json');
            resultFST.setMergeStrategy('listConcat');
            resultFST.setContent([]);
            resultFST.originNode = "{\"type\":\"ArrayExpression\"}";

            debugger;
            const parsingResult = jsonParser.parse('[]');
            expect(parsingResult).not.to.be.undefined;
            expect(parsingResult).to.be.eql(resultFST);
        });

        it('Check parser parses empty JSON string "", throws error', () => {
            assert.throws(() => {
                jsonParser.parse('')
            }, 'Invalid JSON input');
        });
    });
});