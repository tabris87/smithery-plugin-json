import { expect } from 'chai';

import { Generator as GeneratorOwn } from '../lib/generator.js';
import { Parser as ParserOwn } from '../lib/parser.js';
import * as aRulesOwn from '../lib/rules/index.js';

//setup the heavy dependency chain
import { GeneratorFactory, ParserFactory, RuleSet, Imposer } from 'smithery';

const oImposer = new Imposer(
    new ParserFactory(),
    new GeneratorFactory(),
    new RuleSet()
);

const ownGen = new GeneratorOwn();
const ownPar = new ParserOwn();

oImposer.getParserFactory().addParser(ownPar, 'json');
oImposer.getGeneratorFactory().addGenerator(ownGen, 'json');
oImposer.getRuleSet().addMultipleRules(Object.values(aRulesOwn));

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

describe('Check different imposings from an object root element', () => {
    context('First level property imposing', () => {
        it('Test simple property addition', () => {
            const sBaseJSON = '{"simple":"base"}';
            const sFeatureJSON = '{"additional":"feature"}';
            const sResultJSON = formatResult('{"simple":"base","additional":"feature"}');

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test simple property replace "base" -> "feature"', () => {
            const sBaseJSON = '{"simple":"base"}';
            const sFeatureJSON = '{"simple":"feature"}';
            const sResultJSON = formatResult(sFeatureJSON);

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test simple property replace 1 -> 2', () => {
            const sBaseJSON = '{"number":1}';
            const sFeatureJSON = '{"number":2}';
            const sResultJSON = formatResult(sFeatureJSON);

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test simple property replace 1 -> {}', () => {
            const sBaseJSON = '{"number":1}';
            const sFeatureJSON = '{"number":{}}';
            const sResultJSON = formatResult(sFeatureJSON);

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test simple property replace 1 -> []', () => {
            const sBaseJSON = '{"number":1}';
            const sFeatureJSON = '{"number":[]}';
            const sResultJSON = formatResult(sFeatureJSON);
            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });
    });

    context('Property replacement', () => {
        it('Test object property replace {} -> 1', () => {
            const sBaseJSON = '{"object":{"test":1}}';
            const sFeatureJSON = '{"object":1}';
            const sResultJSON = formatResult(sFeatureJSON);

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test array property replace [] -> 1', () => {
            const sBaseJSON = '{"array":["1"]}';
            const sFeatureJSON = '{"array":1}';
            const sResultJSON = formatResult(sFeatureJSON);

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });
    });

    context('Property merge', () => {
        it('Test array property merge ["1", "2"] + ["3"] => ["1", "2", "3"]', () => {
            const sBaseJSON = '{"array":["1", "2"]}';
            const sFeatureJSON = '{"array":["3"]}';
            const sResultJSON = formatResult('{"array": ["1","2","3"]}');
            debugger;
            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test array property merge ["1"] + [{"number": 2}] => ["1", {"number": 2}]', () => {
            const sBaseJSON = '{"array":["1"]}';
            const sFeatureJSON = '{"array":[{"number": 2}]}';
            const sResultJSON = formatResult('{"array": ["1", {"number": 2}]}');

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test array property merge ["1"] + [["2"]] => ["1", ["2"]]', () => {
            const sBaseJSON = '{"array":["1"]}';
            const sFeatureJSON = '{"array":[["2"]]}';
            const sResultJSON = formatResult('{"array": ["1", ["2"]]}');

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test array property merge [["1"], ["2"]] + [["3"]] => [["1"], ["2"], ["3"]]', () => {
            const sBaseJSON = '{"array":[["1"], ["2"]]}';
            const sFeatureJSON = '{"array":[["3"]]}';
            const sResultJSON = formatResult('{"array": [["1"], ["2"], ["3"]]}');
            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });

        it('Test array property merge [{"prop":"1"}, {"prop":"2"}] + [{"prop":"3"}] => [{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]', () => {
            const sBaseJSON = '{"array":[{"prop":"1"}, {"prop":"2"}]}';
            const sFeatureJSON = '{"array":[{"prop":"3"}]}';
            const sResultJSON = formatResult('{"array": [{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]}');

            expect(imposing(sBaseJSON, sFeatureJSON)).to.be.equal(sResultJSON);
        });
    });

    /**
     * @TODO missing nested tests for:
     * - Objects, within Objects
     */
});