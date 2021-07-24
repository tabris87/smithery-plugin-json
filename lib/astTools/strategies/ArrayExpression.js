import { RootStrategy } from './RootStrategy.js';
import { FSTTerminal } from "smithery/lib/utils/index.js";
import { generate } from '../generator.js';
import { parse } from '../parser.js';
import { astToFst } from '../transformer.js';

export class ArrayExpression extends RootStrategy {
    static childKeys = ["elements"];
    static nodeType = 'ArrayExpression';

    constructor(mOptions) {
        super(mOptions);
    }

    toFST(oAST, parent) {
        this._ast = oAST;
        this.removeDefaults(this._ast);

        const nA = new FSTTerminal(this._ast.type, this._determineName(oAST, parent));
        nA.setParent(parent);
        nA.setContent(this._ast.elements.map(e => generate(e)));

        nA.setMergeStrategy('listConcat');
        nA.setCodeLanguage('json');

        if (this.getStrategyOptions()['featureName']) {
            nA.setFeatureName(this.getStrategyOptions()['featureName']);
        }

        const tempEle = this._ast.elements;
        delete this._ast.elements;
        nA.originNode = JSON.stringify(this._ast);
        this._ast.elements = tempEle;
        return nA;
    }

    toAST(oFST, parent) {
        this._fst = oFST;
        const node = {};
        node.type = this._fst.getType();
        if (typeof oFST.getContent() === "string") {
            node.elements = [""];
        } else {
            node.elements = oFST.getContent().map(c => {
                parse(c);
            });
        }
        return node;
    }

    _determineName(oAST, parent) {
        if (!parent) {
            return 'root';
        } else {
            return `${oAST.type}_${parent.getChildren()}_${parent.getName()}`;
        }
    }
}