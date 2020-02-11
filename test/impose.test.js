const generator = require('../lib/generator');
const parser = require('../lib/parser');
const aRules = require('../lib/rules');
//setup the heavy dependency chain
const ImposerCL = require('featureJS/lib/Imposer');
const ParserCL = require('featureJS/lib/Parser');
const GeneratorCL = require('featureJS/lib/Generator');
const RuleSetCL = require('featureJS/lib/RuleSet');

const oImposer = new ImposerCL({
    parser: new ParserCL(),
    generator: new GeneratorCL(),
    rules: new RuleSetCL()
})

oImposer.getParser().addParser(parser, 'json');
oImposer.getGenerator().addGenerator(generator, 'json');
oImposer.getRuleSet().addMultipleRules(aRules);

function imposing(sBaseJSON, sFeatureJSON) {
    const oAstBase = parser.parse(sBaseJSON);
    const oAstFeature = parser.parse(sFeatureJSON);
    const resultAst = oImposer.impose(oAstBase, oAstFeature, oImposer.getParser().getVisitorKeys('json'));
    return oImposer.getGenerator().generate(resultAst, 'json');
}

test('Test simple property addition', () => {
    const sBaseJSON = '{"simple":"base"}';
    const sFeatureJSON = '{"additional":"feature"}';
    const sResultJSON = '{\n    "simple": "base",\n    "additional": "feature"\n}';

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});