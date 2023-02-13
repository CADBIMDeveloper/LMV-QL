import 'mocha';
import { assert, expect } from 'chai';
import { computeExpressionValue, query } from '../index';
import { model } from './mocks/modelMock';

describe("Query tests", () => {
    it("must perform query", async () => {
        const element = await query(model, "*.[element property] = 5.7", {
            attributesCaseSensitive: true,
            leafNodesOnly: true,
            stringCaseSensitive: true,
            tolerance: 1e-5
        });

        assert.isNull(element.error);
        expect(element.dbIds).to.eql([4]);
    });

    it("must evaluate property expression", async () => {
        const elementPropertiesQueryResults = await computeExpressionValue(model, 4, "*.[element property]");

        assert.isNull(elementPropertiesQueryResults.error);
        assert.equal(elementPropertiesQueryResults.result, 5.7);
    });
});