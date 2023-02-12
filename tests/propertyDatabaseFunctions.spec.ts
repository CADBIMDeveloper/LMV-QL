import 'mocha';
import { assert, expect } from 'chai';
import { computeExpressionValue, query } from '../index';
import { model } from './mocks/modelMock';
import { Settings } from '../output';

describe('Query tests', () => {
    const leafNodesOnlySettings: Settings = {
        attributesCaseSensitive: true,
        leafNodesOnly: true,
        stringCaseSensitive: true,
        tolerance: 1e-5
    }

    const allElementsSetttings: Settings = {
        attributesCaseSensitive: true,
        leafNodesOnly: false,
        stringCaseSensitive: true,
        tolerance: 1e-5
    }

    it("must query leaf elements", async () => {
        const element = await query(model, "*.[element property] = 5.7", leafNodesOnlySettings);

        assert.isNull(element.error);
        expect(element.dbIds).to.eql([4]);

        const type = await query(model, "*.[element type property] = 1.3", leafNodesOnlySettings);

        assert.isNull(type.error);
        expect(type.dbIds).to.eql([4]);
    });

    it("must query elements from the tree", async () => {
        const elements = await query(model, "*.[element type property] = 1.3", allElementsSetttings);

        assert.isNull(elements.error);
        expect(elements.dbIds).to.eql([3, 4]);
    });

    it("must fail on the incorrect query", async () => {
        const results = await query(model, "*.[element property]", leafNodesOnlySettings); // missing comparison

        assert.isNotNull(results.error);
    });

    it("must query property value", async () => {
        const elementPropertiesQueryResults = await computeExpressionValue(model, 4, "*.[element property]");

        assert.isNull(elementPropertiesQueryResults.error);
        assert.equal(elementPropertiesQueryResults.result, 5.7);

        const elementTypePropertiesQueryResults = await computeExpressionValue(model, 4, "*.[element type property]");

        assert.isNull(elementTypePropertiesQueryResults.error);
        assert.equal(elementTypePropertiesQueryResults.result, 1.3);
    });
});