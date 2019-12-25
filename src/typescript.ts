/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import * as _ from 'lodash'

import { TableDefinition } from './schemaInterfaces'
import Options from './options'

function nameIsReservedKeyword (name: string): boolean {
    const reservedKeywords = [
        'string',
        'number',
        'package'
    ]
    return reservedKeywords.indexOf(name) !== -1
}

function normalizeName (name: string, options: Options): string {
    if (nameIsReservedKeyword(name)) {
        return name + '_'
    } else {
        return name
    }
}

export function generateTableInterface (tableNameRaw: string, tableDefinition: TableDefinition, insert: boolean, options: Options) {
    const tableName = options.transformTypeName(tableNameRaw)
    let members = ''
    Object.keys(tableDefinition).forEach((columnNameRaw) => {
        let columnDefinition = tableDefinition[columnNameRaw]
        let type = columnDefinition.tsType
        let nullable = columnDefinition.nullable ? ' | null' : ''
        let optional = insert && (columnDefinition.default !== null || columnDefinition.nullable) ? '?' : ''
        const columnName = options.transformColumnName(columnNameRaw)
        members += `${columnName}${optional}: ${type}${nullable};\n`
    })
    let insertInterface = insert ? 'Insert' : ''
    return `
        export interface ${normalizeName(tableName, options)}${insertInterface} {
        ${members}
        }
    `
}

export function generateEnumType (enumObject: any, options: Options) {
    let enumString = ''
    for (let enumNameRaw in enumObject) {
        const enumName = options.transformTypeName(enumNameRaw)
        enumString += `export type ${enumName} = `
        enumString += enumObject[enumNameRaw].map((v: string) => `'${v}'`).join(' | ')
        enumString += ';\n'
    }
    return enumString
}
