import { FSTTerminal } from "smithery/lib/utils/index.js";
import { RootStrategy } from "./RootStrategy.js";

export class Literal extends RootStrategy {
    static childKeys = [];
    static nodeType = 'Literal';

    constructor(mOptions) {
        super(mOptions);
    }

    toFST(oAST, parent) {
        this._ast = oAST;
        this.removeDefaults(this._ast);

        const t = new FSTTerminal(this._ast.type, this._determineName(oAST, parent)); //typeof this._ast.key !== 'undefined' ? this._ast.key.value : '');
        t.setContent(this._ast.value);
        t.setParent(parent);

        t.setMergeStrategy('override');
        t.setCodeLanguage('json');

        if (this.getStrategyOptions()['featureName']) {
            t.setFeatureName(this.getStrategyOptions()['featureName']);
        }

        t.originNode = JSON.stringify(this._ast);
        return t;
    }

    toAST(oFST, parent) {
        this._fst = oFST;
        const node = {};
        node.type = this._fst.getType();
        node.value = this._fst.getContent();
        node.raw = this._determineRawValue(node.value);
        return node;
    }

    _determineName(oAST, parent) {
        if (oAST) {
            const name = `${oAST.type}_${oAST.value}`;
            if (parent) {
                return `${name}_${parent.getName()}`
            } else {
                return name;
            }
        }
        return 'undefined';
    }

    _determineRawValue(sValue) {
        let val;
        try {
            val = Number(sValue);
            if (val) {
                return `${val}`;
            }
            if (sValue.toLowerCase().trim() === "true") {
                return `true`;
            }
            if (sValue.toLowerCase().trim() === "false") {
                return `false`;
            }
            if (sValue.toLowerCase().trim() === "null") {
                return `null`;
            }
            if (sValue.trim().length === 0) {
                return "";
            }
            return `\"${sValue}\"`;
        } catch (e) {
            debugger;
        }
    }

}