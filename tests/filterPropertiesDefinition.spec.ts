import 'mocha';
import { assert } from 'chai';
import grammar from "../src/filtergrammar.ohm-bundle";
import { PropertyDefinition, getPropertyDefinition } from '../src/filterOperations';

describe("Filter properties definitions", () => {
    const semantics = grammar.createSemantics();

    semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);

    it("must get exact get top category property definition", () => {
        const match = grammar.match("[Category1]!", "exactElement");

        assert.isTrue(match.succeeded());

        const node = semantics(match);

        const propertyDefinition = node.getPropertyDefinition() as PropertyDefinition;

        assert.equal(propertyDefinition.type, "exact-category");
        assert.equal(propertyDefinition.categories.length, 1);
        assert.equal(propertyDefinition.categories[0], "Category1");
    })
});