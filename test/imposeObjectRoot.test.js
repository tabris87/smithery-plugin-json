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

function formatResult(sResultString) {
    return generator.generate(parser.parse(sResultString));
}

test('Test simple property addition', () => {
    const sBaseJSON = '{"simple":"base"}';
    const sFeatureJSON = '{"additional":"feature"}';
    const sResultJSON = formatResult('{"simple":"base","additional":"feature"}');

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test simple property replace "base" -> "feature"', () => {
    const sBaseJSON = '{"simple":"base"}';
    const sFeatureJSON = '{"simple":"feature"}';
    const sResultJSON = formatResult(sFeatureJSON);

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test simple property replace 1 -> 2', () => {
    const sBaseJSON = '{"number":1}';
    const sFeatureJSON = '{"number":2}';
    const sResultJSON = formatResult(sFeatureJSON);

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test simple property replace 1 -> {}', () => {
    const sBaseJSON = '{"number":1}';
    const sFeatureJSON = '{"number":{}}';
    const sResultJSON = formatResult(sFeatureJSON);

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test simple property replace 1 -> []', () => {
    const sBaseJSON = '{"number":1}';
    const sFeatureJSON = '{"number":[]}';
    const sResultJSON = formatResult(sFeatureJSON);

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test object property replace {} -> 1', () => {
    const sBaseJSON = '{"object":{"test":1}}';
    const sFeatureJSON = '{"object":1}';
    const sResultJSON = formatResult(sFeatureJSON);

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test array property replace [] -> 1', () => {
    const sBaseJSON = '{"array":["1"]}';
    const sFeatureJSON = '{"array":1}';
    const sResultJSON = formatResult(sFeatureJSON);

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test array property merge ["1", "2"] + ["3"] => ["1", "2", "3"]', () => {
    const sBaseJSON = '{"array":["1", "2"]}';
    const sFeatureJSON = '{"array":["3"]}';
    const sResultJSON = formatResult('{"array": ["1","2","3"]}')

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test array property merge ["1"] + [{"number": 2}] => ["1", {"number": 2}]', () => {
    const sBaseJSON = '{"array":["1"]}';
    const sFeatureJSON = '{"array":[{"number": 2}]}';
    const sResultJSON = formatResult('{"array": ["1", {"number": 2}]}');

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test array property merge ["1"] + [["2"]] => ["1", ["2"]]', () => {
    const sBaseJSON = '{"array":["1"]}';
    const sFeatureJSON = '{"array":[["2"]]}';
    const sResultJSON = formatResult('{"array": ["1", ["2"]]}');

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test array property merge [["1"], ["2"]] + [["3"]] => [["1"], ["2"], ["3"]]', () => {
    const sBaseJSON = '{"array":[["1"], ["2"]]}';
    const sFeatureJSON = '{"array":[["3"]]}';
    const sResultJSON = formatResult('{"array": [["1"], ["2"], ["3"]]}');

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

test('Test array property merge [{"prop":"1"}, {"prop":"2"}] + [{"prop":"3"}] => [{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]', () => {
    const sBaseJSON = '{"array":[{"prop":"1"}, {"prop":"2"}]}';
    const sFeatureJSON = '{"array":[{"prop":"3"}]}';
    const sResultJSON = formatResult('{"array": [{"prop":"1"}, {"prop":"2"}, {"prop":"3"}]}');

    expect(imposing(sBaseJSON, sFeatureJSON)).toBe(sResultJSON);
});

/**
 * @TODO missing nested tests for:
 * - Objects, within Objects
 */