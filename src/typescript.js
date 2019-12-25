"use strict";
/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function nameIsReservedKeyword(name) {
    var reservedKeywords = [
        'string',
        'number',
        'package'
    ];
    return reservedKeywords.indexOf(name) !== -1;
}
function normalizeName(name, options) {
    if (nameIsReservedKeyword(name)) {
        return name + '_';
    }
    else {
        return name;
    }
}
function generateTableInterface(tableNameRaw, tableDefinition, insert, options) {
    var tableName = options.transformTypeName(tableNameRaw);
    var members = '';
    Object.keys(tableDefinition).forEach(function (columnNameRaw) {
        var columnDefinition = tableDefinition[columnNameRaw];
        var type = columnDefinition.tsType;
        var nullable = columnDefinition.nullable ? ' | null' : '';
        var optional = insert && (columnDefinition.default !== null || columnDefinition.nullable) ? '?' : '';
        var columnName = options.transformColumnName(columnNameRaw);
        members += "" + columnName + optional + ": " + type + nullable + ";\n";
    });
    var insertInterface = insert ? 'Insert' : '';
    return "\n        export interface " + normalizeName(tableName, options) + insertInterface + " {\n        " + members + "\n        }\n    ";
}
exports.generateTableInterface = generateTableInterface;
function generateEnumType(enumObject, options) {
    var enumString = '';
    for (var enumNameRaw in enumObject) {
        var enumName = options.transformTypeName(enumNameRaw);
        enumString += "export type " + enumName + " = ";
        enumString += enumObject[enumNameRaw].map(function (v) { return "'" + v + "'"; }).join(' | ');
        enumString += ';\n';
    }
    return enumString;
}
exports.generateEnumType = generateEnumType;
//# sourceMappingURL=typescript.js.map