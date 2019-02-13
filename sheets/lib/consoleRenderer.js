"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dup(n, s) {
    var ret = "";
    for (var i = 0; i < n; i++) {
        ret += s;
    }
    return ret;
}
function spaces(n) {
    return dup(n, " ");
}
function renderTable(table) {
    var cellWidths = [];
    var cellValues = [];
    var cells = table.getCells();
    for (var x = 0; x < table.width; x++) {
        var largestCellWidth = 3;
        for (var y = 0; y < table.height; y++) {
            var cellValue = table.getCellValue(x, y);
            var cellWidth = cellValue.toString().length + 2;
            if (cellWidth > largestCellWidth) {
                largestCellWidth = cellWidth;
            }
            cellValues[(y * table.width) + x] = cellValue;
        }
        cellWidths[x] = largestCellWidth;
    }
    var ret = "Table: " + table.name + "\n";
    ret += "+";
    for (var x = 0; x < table.width; x++) {
        ret += dup(cellWidths[x], "-") + "+";
    }
    ret += "\n";
    for (var y = 0; y < table.height; y++) {
        var row = "|";
        for (var x = 0; x < table.width; x++) {
            var cellValue = cellValues[(y * table.width) + x];
            row += " " + cellValue + spaces(cellWidths[x] - cellValue.toString().length - 1) + "|";
        }
        ret += row + "\n";
        ret += "+";
        for (var x = 0; x < table.width; x++) {
            ret += dup(cellWidths[x], "-") + "+";
        }
        ret += "\n";
    }
    return ret;
}
exports.renderTable = renderTable;
