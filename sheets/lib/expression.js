"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Expression = /** @class */ (function () {
    function Expression() {
    }
    return Expression;
}());
exports.Expression = Expression;
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Literal.prototype.evaluate = function () {
        return this.value;
    };
    return Literal;
}(Expression));
exports.Literal = Literal;
var BinaryExpression = /** @class */ (function (_super) {
    __extends(BinaryExpression, _super);
    function BinaryExpression(left, op, right) {
        var _this = _super.call(this) || this;
        _this.left = left;
        _this.op = op;
        _this.right = right;
        return _this;
    }
    BinaryExpression.prototype.evaluate = function () {
        switch (this.op) {
            case "+":
                return this.left.evaluate() + this.right.evaluate();
            case "-":
                return this.left.evaluate() - this.right.evaluate();
            case "*":
                return this.left.evaluate() * this.right.evaluate();
            case "/":
                return this.left.evaluate() / this.right.evaluate();
            default:
                throw "Tried to evaluate unknown operator: " + this.op;
        }
    };
    return BinaryExpression;
}(Expression));
exports.BinaryExpression = BinaryExpression;
