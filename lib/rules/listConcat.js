export const listConcat = {
    id: 'listConcat',
    package: 'smithery-plugin-json',
    apply: (base, feature, newNode, _, __) => {

        let resultContent;
        if (base.getType() === 'ArrayExpression' && feature.getType() === 'ArrayExpression') {
            if (base.getContent().length > 0 && feature.getContent().length === 0) {
                resultContent = base.getContent();
            } else if (base.getContent().length === 0 && feature.getContent().length > 0) {
                resultContent = feature.getContent();
            } else {
                resultContent = base.getContent().concat(feature.getContent());
            }
        }
        newNode.setContent(resultContent);
        debugger;
    }
}