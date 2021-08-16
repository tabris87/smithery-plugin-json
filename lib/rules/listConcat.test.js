import { expect } from "chai";

import { Generator } from "../generator.js";
import { Parser } from "../parser.js";
import * as jsonRules from '../rules/index.js';

//setup smithery dependencies
import { GeneratorFactory, ParserFactory, RuleSet, Imposer } from "smithery";

const oImposer = new Imposer(
    new ParserFactory(),
    new GeneratorFactory(),
    new RuleSet()
);

const ownGen = new Generator();
const ownPar = new Parser();

oImposer.getParserFactory().addParser(ownPar, 'json');
oImposer.getGeneratorFactory().addGenerator(ownGen, 'json');
oImposer.getRuleSet().addMultipleRules(Object.values(jsonRules));

function imposing(sBaseJSON, sFeatureJSON) {
    //for testing we can consider this as defaults
    const oAstBase = ownPar.parse(sBaseJSON, { featureName: 'base' });
    const oAstFeature = ownPar.parse(sFeatureJSON, { featureName: 'feature' });
    const resultAst = oImposer.impose({ 'base': oAstBase, 'feature': oAstFeature }, ['base', 'feature']);
    const gen = oImposer.getGeneratorFactory().getGenerator('json');
    return gen.generate(resultAst);
}

function formatResult(sResultString) {
    return ownGen.generate(ownPar.parse(sResultString));
}

export default function () {
    describe('Check the list concatenation of arrays', () => {
        describe('Property merge', () => {
            it('Test array property merge ["1", "2"] + ["3"] => ["1", "2", "3"]', () => {
                const sBaseJSON = '["1", "2"]';
                const sFeatureJSON = '["3"]';
                const sResultJSON = formatResult('["1","2","3"]');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            it('Test array property merge ["1"] + [{"number": 2}] => ["1", {"number": 2}]', () => {
                const sBaseJSON = '["1"]';
                const sFeatureJSON = '[{"number": 2}]';
                const sResultJSON = formatResult('["1", {"number": 2}]');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            it('Test array property merge ["1"] + [["2"]] => ["1", ["2"]]', () => {
                const sBaseJSON = '["1"]';
                const sFeatureJSON = '[["2"]]';
                const sResultJSON = formatResult('["1", ["2"]]');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            it('Test array property merge [["1"], ["2"]] + [["3"]] => [["1"], ["2"], ["3"]]', () => {
                const sBaseJSON = '[["1"], ["2"]]';
                const sFeatureJSON = '[["3"]]';
                const sResultJSON = formatResult('[["1"], ["2"], ["3"]]');
                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });

            it('Test array property merge [{"prop":"1"}, {"prop":"2"}] + [{"prop":"3"}] => [{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]', () => {
                const sBaseJSON = '[{"prop":"1"}, {"prop":"2"}]';
                const sFeatureJSON = '[{"prop":"3"}]';
                const sResultJSON = formatResult('[{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]');

                expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
            });
        });
    });
}