import 'mocha';
import { assert, expect } from 'chai';
import { Settings } from '../output';
import { computeExpression, filterElements } from '../propertyDatabaseFunctions';
import { pdb } from './mocks/propertyDatabaseMock';
import { doubleRootPdb } from './mocks/doubleRootPropertyDatabaseMock';

describe('Query functions tests', () => {
    const leafNodesOnlySettings: Settings = {
        attributesCaseSensitive: true,
        leafNodesOnly: true,
        stringCaseSensitive: true,
        tolerance: 1e-5,
        displayUnits: "",
        displayUnitsPrecision: "",
        dbIds: []
    }

    const allElementsSetttings: Settings = {
        attributesCaseSensitive: true,
        leafNodesOnly: false,
        stringCaseSensitive: true,
        tolerance: 1e-5,
        displayUnits: "",
        displayUnitsPrecision: "",
        dbIds: []
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
    })

    it("must query property value", () => {
        const elementPropertiesQueryResults = computeExpression(pdb, {
            nodeId: 4,
            propertyQuery: "*.[element property]",
            options: {
                attributesCaseSensitive: true,
                displayUnits: "",
                displayUnitsPrecision: ""
            }
        });

        assert.isNull(elementPropertiesQueryResults.error);
        assert.equal(elementPropertiesQueryResults.result, 5.7);

        const elementTypePropertiesQueryResults = computeExpression(pdb, {
            nodeId: 4,
            propertyQuery: "*.[element type property]",
            options: {
                attributesCaseSensitive: true,
                displayUnits: "",
                displayUnitsPrecision: ""
            }
        });

        assert.isNull(elementTypePropertiesQueryResults.error);
        assert.equal(elementTypePropertiesQueryResults.result, 1.3);
    });

    it("must query property value according to specified display units", () => {
        const elementPropertiesQueryResults = computeExpression(pdb, {
            nodeId: 4,
            propertyQuery: "*.Length",
            options: {
                attributesCaseSensitive: true,
                displayUnits: "in",
                displayUnitsPrecision: ""
            }
        });

        assert.isNull(elementPropertiesQueryResults.error);
        assert.equal(elementPropertiesQueryResults.result, 1);
    });

    it("must query deepest node property value on wildcarded query if several elements have equally-named properties", () => {
        const elementPropertiesQueryResults = computeExpression(pdb, {
            nodeId: 4,
            propertyQuery: "*.name",
            options: {
                attributesCaseSensitive: true,
                displayUnits: "",
                displayUnitsPrecision: ""
            }
        });

        assert.isNull(elementPropertiesQueryResults.error);
        assert.equal(elementPropertiesQueryResults.result, "Element");
    });
});