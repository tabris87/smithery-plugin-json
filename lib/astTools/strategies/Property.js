import { FSTTerminal } from "smithery/lib/utils/index.js";
import { generate } from '../generator.js';
import { parse } from '../parser.js';
import { RootStrategy } from "./RootStrategy.js";

export class Property extends RootStrategy {
    static childKeys = ["value"];
    static nodeType = 'Property';

    constructor(mOptions) {
        super(mOptions);
    }

    toFST(oAST, parent) {
        this._ast = oAST;
        this.removeDefaults(this._ast);

        const t = new FSTTerminal(this._ast.type, this._determineName(oAST, parent)); //typeof this._ast.key !== 'undefined' ? this._ast.key.value : '');
        t.setContent(generate(this._ast.value));
        t.setParent(parent);

        t.setMergeStrategy('propertyCompose');
        t.setCodeLanguage('json');

        if (this.getStrategyOptions()['featureName']) {
            t.setFeatureName(this.getStrategyOptions()['featureName']);
        }

        const tempVal = this._ast.value;
        delete this._ast.value;
        t.originNode = JSON.stringify(this._ast);
        this._ast.value = tempVal;
        return t;
    }

    toAST(oFST, parent) {
        this._fst = oFST;
        const node = {};
        node.type = this._fst.getType();
        node.key = {
            type: "Literal",
            value: this._fst.getName(),
            raw: `\"${this._fst.getName()}\"`
        };
        try {
            node.value = parse(oFST.getContent());
        } catch (e) {
            debugger;
        }
        return node;
    }

    _determineName(oAST, parent) {
        if (oAST && oAST.key && oAST.key.value) {
            return oAST.key.value;
        } else if (oAST && oAST.key && !oAST.key.value && !parent) {
            return 'root';
        } else {
            return oAST.type + '_' + parent.getName();
        }
    }
}