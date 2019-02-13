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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Expr = __importStar(require("./expression"));
var consoleRenderer_1 = require("./consoleRenderer");
var Formula = /** @class */ (function () {
    function Formula(expr) {
        this.expr = expr;
    }
    Formula.prototype.evaluate = function () {
        return this.expr.evaluate();
    };
    return Formula;
}());
exports.Formula = Formula;
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(content) {
        var _this = _super.call(this) || this;
        _this.content = content;
        return _this;
    }
    Cell.prototype.evaluate = function () {
        var ret = this.getValue();
        if (typeof ret === "string") {
            throw "Tried to evaluate cell as expression, but it returned string. This is currently not supported";
        }
        return ret;
    };
    Cell.prototype.getValue = function () {
        if (typeof this.content === 'number' || typeof this.content === 'string') {
            return this.content;
        }
        else if (this.content instanceof Cell) {
            return this.content.getValue();
        }
        else if (this.content instanceof Formula) {
            return this.content.evaluate();
        }
        else {
            throw "Tried to get value of unknown content type";
        }
    };
    return Cell;
}(Expr.Expression));
exports.Cell = Cell;
var Table = /** @class */ (function () {
    function Table(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.cells = [];
    }
    Table.prototype.getCells = function () {
        return this.cells;
    };
    Table.prototype.index = function (x, y) {
        return (y * this.width) + x;
    };
    Table.prototype.reference = function (x, y) {
        return this.cells[this.index(x, y)];
    };
    Table.prototype.setCell = function (x, y, value) {
        this.cells[this.index(x, y)] = new Cell(value);
    };
    Table.prototype.getCell = function (x, y) {
        return this.cells[this.index(x, y)];
    };
    Table.prototype.getCellValue = function (x, y) {
        return this.getCell(x, y).getValue();
    };
    Table.prototype.getCellContent = function (x, y) {
        return this.getCell(x, y).content;
    };
    Table.prototype.derive = function (name, func) {
        return new DerivedTable(name, func, this);
    };
    return Table;
}());
exports.Table = Table;
var DerivedTable = /** @class */ (function (_super) {
    __extends(DerivedTable, _super);
    function DerivedTable(name, func) {
        var tables = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            tables[_i - 2] = arguments[_i];
        }
        var _this = _super.call(this, name, tables.reduce(function (prev, curr) { return Math.max(prev, curr.width); }, 0), tables.reduce(function (prev, curr) { return Math.max(prev, curr.height); }, 0)) || this;
        _this.func = func;
        _this.tables = tables;
        return _this;
    }
    DerivedTable.prototype.getCell = function (x, y) {
        return this.func.apply(this, this.tables.map(function (c) { return c.getCell(x, y); }));
    };
    return DerivedTable;
}(Table));
exports.DerivedTable = DerivedTable;
var t = new Table("Table one", 4, 3);
t.setCell(0, 0, 0);
t.setCell(1, 0, 100000);
t.setCell(2, 0, 20);
t.setCell(3, 0, 30);
t.setCell(0, 1, 1);
t.setCell(1, 1, 11);
t.setCell(2, 1, 21123);
t.setCell(3, 1, 31);
t.setCell(0, 2, 2);
t.setCell(1, 2, 12);
t.setCell(2, 2, 22);
t.setCell(3, 2, 32);
console.log(consoleRenderer_1.renderTable(t));
