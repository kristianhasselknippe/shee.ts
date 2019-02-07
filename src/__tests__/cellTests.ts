import * as Shee from "../index"

test("Basic cell assignment", () => {
	const table = new Shee.Table("Salaries", 2, 5)
	table.setCell(0,0, "Kristian")
	table.setCell(1,0, 10)
	table.setCell(0,1, "Anders")
	table.setCell(1,1, 12)

	expect(table.getCellValue(0,0)).toBe("Kristian")
	expect(table.getCellValue(1,0)).toBe(10)
	expect(table.getCellValue(0,1)).toBe("Anders")
	expect(table.getCellValue(1,1)).toBe(12)
})
