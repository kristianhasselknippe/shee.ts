"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Shee = __importStar(require("../index"));
var expression_1 = require("../expression");
var index_1 = require("../index");
var consoleRenderer_1 = require("../consoleRenderer");
test("Basic cell assignment", function () {
    var table = new Shee.Table("Salaries", 1, 1);
    table.setCell(0, 0, "Kristian");
    expect(table.getCellValue(0, 0)).toBe("Kristian");
});
test("Basic cell references", function () {
    var table = new Shee.Table("Salaries", 2, 5);
    table.setCell(0, 0, "Kristian");
    table.setCell(1, 0, 10);
    table.setCell(0, 1, "Anders");
    table.setCell(1, 1, table.reference(1, 0));
    expect(table.getCellValue(0, 0)).toBe("Kristian");
    expect(table.getCellValue(1, 0)).toBe(10);
    expect(table.getCellValue(0, 1)).toBe("Anders");
    expect(table.getCellValue(1, 1)).toBe(10);
});
test("Formula: simple binary expressions 5+10", function () {
    var table = new Shee.Table("Salaries", 1, 1);
    table.setCell(0, 0, new index_1.Formula(new expression_1.BinaryExpression(new expression_1.Literal(5), "+", new expression_1.Literal(10))));
    expect(table.getCellValue(0, 0)).toBe(15);
});
test("Formula: simple binary expressions 20/5", function () {
    var table = new Shee.Table("Salaries", 1, 1);
    table.setCell(0, 0, new index_1.Formula(new expression_1.BinaryExpression(new expression_1.Literal(20), "/", new expression_1.Literal(5))));
    expect(table.getCellValue(0, 0)).toBe(4);
});
test("Formula: simple binary expressions with ref to other cells", function () {
    var table = new Shee.Table("Salaries", 1, 3);
    table.setCell(0, 0, 10);
    table.setCell(0, 1, 5);
    table.setCell(0, 2, new index_1.Formula(new expression_1.BinaryExpression(table.reference(0, 0), "*", table.reference(0, 1))));
    expect(table.getCellValue(0, 2)).toBe(50);
});
test("Formula: binary expression, multiple layers", function () {
    var table = new Shee.Table("Salaries", 1, 7);
    table.setCell(0, 0, 4);
    table.setCell(0, 1, 10);
    table.setCell(0, 2, 120);
    table.setCell(0, 3, 2);
    table.setCell(0, 4, new index_1.Formula(new expression_1.BinaryExpression(table.reference(0, 0), "*", table.reference(0, 1))));
    table.setCell(0, 5, new index_1.Formula(new expression_1.BinaryExpression(table.reference(0, 2), "/", table.reference(0, 3))));
    table.setCell(0, 6, new index_1.Formula(new expression_1.BinaryExpression(table.reference(0, 4), "+", table.reference(0, 5))));
    expect(table.getCellValue(0, 6)).toBe(100);
});
test("Formula: Multiple tables", function () {
    var t1 = new Shee.Table("T1", 1, 1);
    var t2 = new Shee.Table("T2", 1, 1);
    var t3 = new Shee.Table("T3", 1, 1);
    t1.setCell(0, 0, 123);
    t2.setCell(0, 0, 321);
    t3.setCell(0, 0, new index_1.Formula(new expression_1.BinaryExpression(t1.reference(0, 0), "*", t2.reference(0, 0))));
    expect(t3.getCellValue(0, 0)).toBe(39483);
});
test("Command line rendering", function () {
    var t = new Shee.Table("Table one", 4, 3);
    t.setCell(0, 0, 0);
    t.setCell(1, 0, 10);
    t.setCell(2, 0, 20);
    t.setCell(3, 0, 30);
    t.setCell(0, 1, 1);
    t.setCell(1, 1, 11);
    t.setCell(2, 1, 21);
    t.setCell(3, 1, 31);
    t.setCell(0, 2, 2);
    t.setCell(1, 2, 12);
    t.setCell(2, 2, 22);
    t.setCell(3, 2, 32);
    console.log(consoleRenderer_1.renderTable(t));
});
test("Simple Derived Table test", function () {
    var table = new Shee.Table("T1", 2, 2);
    table.setCell(0, 0, 1);
    table.setCell(1, 0, 2);
    table.setCell(0, 1, 3);
    table.setCell(1, 1, 4);
    var derived = table.derive("Times two table", function (a) {
        return new Shee.Cell(
        //TODO: Clean up API
        a.getValue() * 2);
    });
    expect(derived.getCellValue(0, 0)).toBe(2);
    expect(derived.getCellValue(1, 0)).toBe(4);
    expect(derived.getCellValue(0, 1)).toBe(6);
    expect(derived.getCellValue(1, 1)).toBe(8);
});
test("Simple Derived Table test two sources", function () {
    var table1 = new Shee.Table("T1", 1, 2);
    table1.setCell(0, 0, 1);
    table1.setCell(1, 0, 2);
    var table2 = new Shee.Table("T2", 1, 2);
    table2.setCell(0, 0, 5);
    table2.setCell(1, 0, 9);
    var derived = new Shee.DerivedTable("Add them", function (a, b) {
        return new Shee.Cell(
        //TODO: Clean up API
        a.getValue() + b.getValue());
    }, table1, table2);
    expect(derived.getCellValue(0, 0)).toBe(6);
    expect(derived.getCellValue(0, 1)).toBe(11);
});
