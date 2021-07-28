import TestArrayExpression from './ArrayExpression.test.js';
import TestLiteral from './Literal.test.js';
import TestObjectExpression from './ObjectExpression.test.js';
import TestProperty from './Property.test.js';

describe('Transformation Strategies', () => {
    TestArrayExpression();
    TestLiteral();
    TestObjectExpression();
    TestProperty();
});