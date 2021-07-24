import { TransformerFactory } from './TransformerFactory.js';

function astToFst(oAST, mOptions) {
    const oStrategy = TransformerFactory.getStrategy(oAST, mOptions);
    if (!oStrategy) { debugger; }
    return oStrategy.toFST(oAST);
}

function fstToAst(oFST) {
    const oStrategy = TransformerFactory.getStrategy(oFST);
    return oStrategy.toAST(oFST);
}

export {
    astToFst,
    fstToAst
}