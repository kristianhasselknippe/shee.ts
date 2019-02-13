export declare type Operator = "+" | "-" | "*" | "/";
export declare abstract class Expression {
    abstract evaluate(): number;
}
export declare type LiteralValue = number;
export declare class Literal extends Expression {
    private value;
    constructor(value: LiteralValue);
    evaluate(): number;
}
export declare class BinaryExpression extends Expression {
    private left;
    private op;
    private right;
    constructor(left: Expression, op: Operator, right: Expression);
    evaluate(): number;
}
//# sourceMappingURL=expression.d.ts.map