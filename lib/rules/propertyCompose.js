export const propertyCompose = {
    id: 'propertyCompose',
    package: 'smithery-plugin-json',
    apply: (base, feature, newNode, parent, context) => {
        const JParser = context.getParserFactory().getParser('json');
        const JGenerator = context.getGeneratorFactory().getGenerator('json');

        const baseContent = JParser.parse(base.getContent(), { featureName: base.getFeatureName() });
        const featureContent = JParser.parse(feature.getContent(), { featureName: feature.getFeatureName() });

        let imposedContent;
        //if its a literal we just have to replace them
        if (baseContent.getType() === 'Literal' && featureContent.getType() === 'Literal') {
            imposedContent = featureContent.shallowClone();
            //if the type is different the 'new' one has to be used
        } else if (!baseContent.compatibleWith(featureContent)) {
            imposedContent = featureContent.deepClone();
        } else {
            imposedContent = context.impose({ [base.getFeatureName()]: baseContent, [feature.getFeatureName()]: featureContent }, [base.getFeatureName(), feature.getFeatureName()])
        }

        newNode.setContent(JGenerator.generate(imposedContent));
    }
}