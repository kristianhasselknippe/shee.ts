import * as Shee from "../index"

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
