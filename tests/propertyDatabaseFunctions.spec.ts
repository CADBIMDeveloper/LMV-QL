import 'mocha';
import { assert, expect } from 'chai';
import { Settings } from '../output';
import { filterElements } from '../propertyDatabaseFunctions';
import { pdb } from './mocks/propertyDatabaseMock';
import { doubleRootPdb } from './mocks/doubleRootPropertyDatabaseMock';
import { isAlmostEqual } from '../src/numbersComparison';

describe('Query functions tests', () => {
    const leafNodesOnlySettings: Settings = {
        attributesCaseSensitive: true,
        leafNodesOnly: true,
        stringCaseSensitive: true,
        tolerance: 1e-5,
        displayUnits: "",
        displayUnitsPrecision: "",
        dbIds: [],
        modelBrowserExcludeRoot: true,
        modelName: "root"
    }

    const allElementsSetttings: Settings = {
        attributesCaseSensitive: true,
        leafNodesOnly: false,
        stringCaseSensitive: true,
        tolerance: 1e-5,
        displayUnits: "",
        displayUnitsPrecision: "",
        dbIds: [],
        modelBrowserExcludeRoot: true,
        modelName: "root"
    }

    it("must query leaf elements", () => {
        const element = filterElements(pdb, {
            lmvQuery: "*.[element property] = 5.7",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(element.error);
        expect(element.dbIds).to.eql([4]);

        const type = filterElements(pdb, {
            lmvQuery: "*.[element type property] = 1.3",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(type.error);
        expect(type.dbIds).to.eql([4]);
    });

    it("must query elements from the tree", () => {
        const elements = filterElements(pdb, {
            lmvQuery: "*.[element type property] = 1.3",
            lmvQueryOptions: allElementsSetttings,
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(elements.error);
        expect(elements.dbIds).to.eql([3, 4]);
    });

    it("must query instance-of properties", () => {
        const elements = filterElements(pdb, {
            lmvQuery: "*.[instance property] = \"instance property value\"",
            lmvQueryOptions: allElementsSetttings,
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(elements.error);
        expect(elements.dbIds).to.eql([3, 4]);
    });

    it("must query property value from double-rooted model", () => {
        const results = filterElements(doubleRootPdb, {
            lmvQuery: "Element.[element property] = 5.7",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3]
        });

        assert.isNull(results.error);
        expect(results.dbIds).to.eql([3]);
    });

    it("must query property value with specified display units", () => {
        const results = filterElements(pdb, {
            lmvQuery: "*.Length = 1",
            lmvQueryOptions: { ...leafNodesOnlySettings, displayUnits: "in" },
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(results.error);
        expect(results.dbIds).to.eql([4]);
    });

    it("must return results for queries with select clause", () => {
        const results = filterElements(pdb, {
            lmvQuery: "*.name = \"Element\" -> *.name as name, *.Level, *.Length as length",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(results.error);

        assert.equal(results.rows.length, 1);
        assert.equal(results.columns.length, 3);

        assert.equal(results.columns[0], "name");
        assert.equal(results.columns[1], "$col_2");
        assert.equal(results.columns[2], "length");

        const values = results.rows[0].values;

        assert.equal(values.name, "Element");
        assert.equal(values.length, 25.4);
        assert.equal(values["$col_2"], "Level 1");
    });

    it("must return results for queries with aggreaged functions", () => {
        const results = filterElements(pdb, {
            lmvQuery: "count() as cnt, sum(*.Length) as sum, min(*.Length) as min, max(*.Length) as max, avg(*.Length) as avg",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3, 4, 7]
        });

        assert.isNull(results.error);

        assert.equal(results.rows.length, 1);

        const values = results.rows[0].values;

        assert.equal(values.cnt, 2)
        assert.isTrue(isAlmostEqual(values.sum as number, 76.2));
        assert.equal(values.min, 25.4);
        assert.equal(values.max, 50.8);
        assert.isTrue(isAlmostEqual(values.avg as number, 38.1));
    });

    it("must return results for queries with grouped aggregation functions", () => {
        const results = filterElements(pdb, {
            lmvQuery: "*.Length > 0 -> count() as cnt, sum(*.Length) as sum, min(*.Length) as min, max(*.Length) as max, avg(*.Length) as avg group by *.Length",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3, 4, 7]
        });

        assert.isNull(results.error);
        assert.equal(results.rows.length, 2);

        expect(results.rows[0].dbIds).to.eql([4]);

        assert.equal(results.rows[0].values["$grp_col_1"], 25.4);
        assert.equal(results.rows[0].values.sum, 25.4);
        assert.equal(results.rows[0].values.min, 25.4);
        assert.equal(results.rows[0].values.max, 25.4);
        assert.equal(results.rows[0].values.avg, 25.4);
        assert.equal(results.rows[0].values.cnt, 1);

        expect(results.rows[1].dbIds).to.eql([7]);

        assert.equal(results.rows[1].values["$grp_col_1"], 50.8);
        assert.equal(results.rows[1].values.sum, 50.8);
        assert.equal(results.rows[1].values.min, 50.8);
        assert.equal(results.rows[1].values.max, 50.8);
        assert.equal(results.rows[1].values.avg, 50.8);
        assert.equal(results.rows[1].values.cnt, 1);
    });

    it("must return results for queries with grouped aggregation functions (omitted filter)", () => {
        const results = filterElements(pdb, {
            lmvQuery: "count() as cnt, sum(*.Length) as sum, min(*.Length) as min, max(*.Length) as max, avg(*.Length) as avg group by *.Length",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3, 4, 7]
        });

        assert.isNull(results.error);
        assert.equal(results.rows.length, 2);

        expect(results.rows[0].dbIds).to.eql([4]);

        assert.equal(results.rows[0].values["$grp_col_1"], 25.4);
        assert.equal(results.rows[0].values.sum, 25.4);
        assert.equal(results.rows[0].values.min, 25.4);
        assert.equal(results.rows[0].values.max, 25.4);
        assert.equal(results.rows[0].values.avg, 25.4);
        assert.equal(results.rows[0].values.cnt, 1);

        expect(results.rows[1].dbIds).to.eql([7]);

        assert.equal(results.rows[1].values["$grp_col_1"], 50.8);
        assert.equal(results.rows[1].values.sum, 50.8);
        assert.equal(results.rows[1].values.min, 50.8);
        assert.equal(results.rows[1].values.max, 50.8);
        assert.equal(results.rows[1].values.avg, 50.8);
        assert.equal(results.rows[1].values.cnt, 1);
    });

    it("filter must contain root category if modelBrowserExcludeRoot is equal to false", () => {
        const lmvQueryOptions: Settings = { ...leafNodesOnlySettings, modelBrowserExcludeRoot: false, modelName: "file.rvt" };

        const results = filterElements(pdb, {
            lmvQuery: "[file.rvt].Category!",
            lmvQueryOptions,
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(results.error);
        expect(results.dbIds).to.eql([4]);

        const emptyResults = filterElements(pdb, {
            lmvQuery: "Category!",
            lmvQueryOptions,
            nodes: [1, 2, 3, 4]
        });

        assert.isNull(emptyResults.error);
        assert.equal(emptyResults.dbIds.length, 0);
    });

    it("must return results for queries with simple select all", () => {
        const results = filterElements(pdb, {
            lmvQuery: "*",
            lmvQueryOptions: leafNodesOnlySettings,
            nodes: [1, 2, 3, 4]
        });

        assert.equal(results.columns.length, 6);
        assert.isTrue(results.columns.includes("name"));
        assert.isTrue(results.columns.includes("element property"));
        assert.isTrue(results.columns.includes("Length"));
        assert.isTrue(results.columns.includes("element type property"));
        assert.isTrue(results.columns.includes("instance property"));
        assert.isTrue(results.columns.includes("Level"));

        assert.equal(results.dbIds.length, 1);
        assert.equal(results.dbIds[0], 4);

        const values = results.rows;

        assert.equal(values.length, 1);
        assert.equal(values[0].values.name, "Element");
        assert.equal(values[0].values.Level, "Level 1");
        assert.equal(values[0].values.Length, 25.4);
        assert.equal(values[0].values["element property"], 5.7);
        assert.equal(values[0].values["element type property"], 1.3);
        assert.equal(values[0].values["instance property"], "instance property value");
    });
});