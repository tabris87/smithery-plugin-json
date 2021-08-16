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
    describe('Check the composition of object expressions', () => {
        describe('First level property imposing', () => {
            it('Test simple property addition', () => {
                const sBaseJSON = '{"simple": "base"}';
                const sFeatureJSON = '{"additional": "feature"}';
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

        describe('Property replacement', () => {
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
    });

    /**
     * @TODO missing nested tests for:
     * - Objects, within Objects
     */
}