import { RootStrategy } from "./RootStrategy.js";
import { TransformerFactory } from "../TransformerFactory.js";
import { FSTNonTerminal } from "smithery/lib/utils/index.js";

export class ObjectExpression extends RootStrategy {
    static childKeys = ["properties"];
    static nodeType = 'ObjectExpression';

    constructor(mOptions) {
        super(mOptions);
    }

    toFST(oAST, parent) {
        this._ast = oAST;
        this.removeDefaults(this._ast);
        const nO = new FSTNonTerminal(this._ast.type, this._determineName(oAST, parent));
        nO.setParent(parent);

        if (this._ast.properties.length > 0) {
            nO.addChildren(this._ast.properties.map(oC => {
                const oStrategy = TransformerFactory.getStrategy(oC, this.getStrategyOptions());
                return oStrategy.toFST(oC, nO);
            }))
        }

        if (this.getStrategyOptions()['featureName']) {
            nO.setFeatureName(this.getStrategyOptions()['featureName']);
        }

        let tempProps = this._ast.properties;
        delete this._ast.properties;
        nO.originNode = JSON.stringify(this._ast);
        this._ast.properties = tempProps;
        return nO;
    }

    toAST(oFST, parent) {
        this._fst = oFST;
        const node = {}
        node.type = this._fst.getType();
        node.properties = this._fst.getChildren().map(oC => {
            const oStrategy = TransformerFactory.getStrategy(oC);
            return oStrategy.toAST(oC, node);
        });
        return node;
    }

    _determineName(oAST, parent) {
        if (!parent) {
            return 'root';
        } else {
            return oAST.type + '_' + parent.getName();
        }
    }
}