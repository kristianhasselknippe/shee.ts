export type Operator = "+" | "-" | "*" | "/"

export abstract class Expression {
	abstract evaluate(): number;
}

export type LiteralValue = number

export class Literal extends Expression {
	constructor(private value: LiteralValue) {
		super()
	}

	evaluate(): number {
		return this.value
	}
}

export class BinaryExpression extends Expression {
	constructor(private left: Expression,
				private op: Operator,
				private right: Expression) {
		super()
	}

	evaluate(): number {
		switch (this.op) {
			case "+":
				return this.left.evaluate() + this.right.evaluate()
			case "-":
				return this.left.evaluate() - this.right.evaluate()
			case "*":
				return this.left.evaluate() * this.right.evaluate()
			case "/":
				return this.left.evaluate() / this.right.evaluate()
			default:
				throw `Tried to evaluate unknown operator: ${this.op}`
		}
	}
}
