import * as Shee from "../index"
import { BinaryExpression, Literal } from "../expression";
import { Formula } from "../index";

test("Basic cell assignment", () => {
	const table = new Shee.Table("Salaries", 1,1)
	table.setCell(0,0, "Kristian")
	expect(table.getCellValue(0,0)).toBe("Kristian")
})

test("Basic cell references", () => {
	const table = new Shee.Table("Salaries", 2, 5)
	table.setCell(0,0, "Kristian")
	table.setCell(1,0, 10)
	table.setCell(0,1, "Anders")
	table.setCell(1,1, table.reference(1,0))

	expect(table.getCellValue(0,0)).toBe("Kristian")
	expect(table.getCellValue(1,0)).toBe(10)
	expect(table.getCellValue(0,1)).toBe("Anders")
	expect(table.getCellValue(1,1)).toBe(10)
})

test("Formula: simple binary expressions 5+10", () => {
	const table = new Shee.Table("Salaries", 1, 1)
	table.setCell(
		0,
		0,
		new Formula(
			new BinaryExpression(
				new Literal(5),
				"+",
				new Literal(10)
			)
		)
	)
	expect(table.getCellValue(0,0)).toBe(15)
})

test("Formula: simple binary expressions 20/5", () => {
	const table = new Shee.Table("Salaries", 1, 1)
	table.setCell(
		0,
		0,
		new Formula(
			new BinaryExpression(
				new Literal(20),
				"/",
				new Literal(5)
			)
		)
	)
	expect(table.getCellValue(0,0)).toBe(4)
})

test("Formula: simple binary expressions with ref to other cells", () => {
	const table = new Shee.Table("Salaries", 1, 3)
	table.setCell(0,0,10)
	table.setCell(0,1,5)
	table.setCell(
		0,
		2,
		new Formula(
			new BinaryExpression(
				table.reference(0,0),
				"*",
				table.reference(0,1)
			)
		)
	)
	expect(table.getCellValue(0,2)).toBe(50)
})
