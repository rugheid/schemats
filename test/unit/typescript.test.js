"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Typescript = require("../../src/typescript");
var options_1 = require("../../src/options");
var options = new options_1.default({});
describe('Typescript', function () {
    describe('generateTableInterface', function () {
        it('empty table definition object', function () {
            var tableInterface = Typescript.generateTableInterface('tableName', {}, false, options);
            assert.equal(tableInterface, '\n' +
                '        export interface tableName {\n' +
                '        \n' +
                '        }\n' +
                '    ');
        });
        it('table name is reserved', function () {
            var tableInterface = Typescript.generateTableInterface('package', {}, false, options);
            assert.equal(tableInterface, '\n' +
                '        export interface package_ {\n' +
                '        \n' +
                '        }\n' +
                '    ');
        });
        it('table with columns', function () {
            var tableInterface = Typescript.generateTableInterface('tableName', {
                col1: { udtName: 'name1', default: null, nullable: false, tsType: 'string' },
                col2: { udtName: 'name2', default: null, nullable: false, tsType: 'number' }
            }, false, options);
            assert.equal(tableInterface, '\n' +
                '        export interface tableName {\n' +
                '        col1: string;\n' +
                'col2: number;\n' +
                '\n' +
                '        }\n' +
                '    ');
        });
        it('table with reserved columns', function () {
            var tableInterface = Typescript.generateTableInterface('tableName', {
                string: { udtName: 'name1', default: null, nullable: false, tsType: 'string' },
                number: { udtName: 'name2', default: null, nullable: false, tsType: 'number' },
                package: { udtName: 'name3', default: null, nullable: false, tsType: 'any' }
            }, false, options);
            assert.equal(tableInterface, '\n' +
                '        export interface tableName {\n' +
                '        string: string;\n' +
                'number: number;\n' +
                'package: any;\n' +
                '\n' +
                '        }\n' +
                '    ');
        });
        describe('insert', function () {
            it('empty table definition object', function () {
                var tableInterface = Typescript.generateTableInterface('tableName', {}, true, options);
                assert.equal(tableInterface, '\n' +
                    '        export interface tableNameInsert {\n' +
                    '        \n' +
                    '        }\n' +
                    '    ');
            });
            it('table name is reserved', function () {
                var tableInterface = Typescript.generateTableInterface('package', {}, true, options);
                assert.equal(tableInterface, '\n' +
                    '        export interface package_Insert {\n' +
                    '        \n' +
                    '        }\n' +
                    '    ');
            });
            it('table with columns', function () {
                var tableInterface = Typescript.generateTableInterface('tableName', {
                    col1: { udtName: 'name1', default: null, nullable: false, tsType: 'string' },
                    col2: { udtName: 'name2', default: null, nullable: false, tsType: 'number' }
                }, true, options);
                assert.equal(tableInterface, '\n' +
                    '        export interface tableNameInsert {\n' +
                    '        col1: string;\n' +
                    'col2: number;\n' +
                    '\n' +
                    '        }\n' +
                    '    ');
            });
            it('table with reserved columns', function () {
                var tableInterface = Typescript.generateTableInterface('tableName', {
                    string: { udtName: 'name1', default: null, nullable: false, tsType: 'string' },
                    number: { udtName: 'name2', default: null, nullable: false, tsType: 'number' },
                    package: { udtName: 'name3', default: null, nullable: false, tsType: 'any' }
                }, true, options);
                assert.equal(tableInterface, '\n' +
                    '        export interface tableNameInsert {\n' +
                    '        string: string;\n' +
                    'number: number;\n' +
                    'package: any;\n' +
                    '\n' +
                    '        }\n' +
                    '    ');
            });
            it('table with optional insert columns', function () {
                var tableInterface = Typescript.generateTableInterface('tableName', {
                    notNullableNoDefault: { udtName: 'name1', default: null, nullable: false, tsType: 'string' },
                    nullableNoDefault: { udtName: 'name1', default: null, nullable: true, tsType: 'string' },
                    notNullableDefault: { udtName: 'name1', default: 'foo', nullable: false, tsType: 'string' },
                    nullableDefault: { udtName: 'name1', default: 'foo', nullable: true, tsType: 'string' }
                }, true, options);
                assert.equal(tableInterface, '\n' +
                    '        export interface tableNameInsert {\n' +
                    '        notNullableNoDefault: string;\n' +
                    'nullableNoDefault?: string | null;\n' +
                    'notNullableDefault?: string;\n' +
                    'nullableDefault?: string | null;\n' +
                    '\n' +
                    '        }\n' +
                    '    ');
            });
        });
    });
    describe('generateEnumType', function () {
        it('empty object', function () {
            var enumType = Typescript.generateEnumType({}, options);
            assert.equal(enumType, '');
        });
        it('with enumerations', function () {
            var enumType = Typescript.generateEnumType({
                enum1: ['val1', 'val2', 'val3', 'val4'],
                enum2: ['val5', 'val6', 'val7', 'val8']
            }, options);
            assert.equal(enumType, 'export type enum1 = \'val1\' | \'val2\' | \'val3\' | \'val4\';\n' +
                'export type enum2 = \'val5\' | \'val6\' | \'val7\' | \'val8\';\n');
        });
    });
    describe('generateEnumType', function () {
        it('empty object', function () {
            var enumType = Typescript.generateEnumType({}, options);
            assert.equal(enumType, '');
        });
        it('with enumerations', function () {
            var enumType = Typescript.generateEnumType({
                enum1: ['val1', 'val2', 'val3', 'val4'],
                enum2: ['val5', 'val6', 'val7', 'val8']
            }, options);
            assert.equal(enumType, 'export type enum1 = \'val1\' | \'val2\' | \'val3\' | \'val4\';\n' +
                'export type enum2 = \'val5\' | \'val6\' | \'val7\' | \'val8\';\n');
        });
    });
});
//# sourceMappingURL=typescript.test.js.map