import 'mocha';
import { assert } from 'chai';
import grammar from "../src/filtergrammar.ohm-bundle";
import { PropertyDefinition, getPropertyDefinition, Category } from '../src/filterOperations';

describe("Filter properties definitions", () => {
    const semantics = grammar.createSemantics();

    semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);

    const isExactCategoryDefinition = (propertyDefinition: PropertyDefinition): propertyDefinition is Category => {
        return propertyDefinition.type === "exact-category";
    }

    it("must get exact get top category definition", () => {
        const match = grammar.match("[Category1]!", "exactElement");

        assert.isTrue(match.succeeded());

        const node = semantics(match);

        const propertyDefinition = node.getPropertyDefinition() as PropertyDefinition;

        const isCategory = isExactCategoryDefinition(propertyDefinition);

        assert.isTrue(isCategory);

        if (!isCategory)
            return;

        assert.equal(propertyDefinition.categories.length, 1);
        assert.equal(propertyDefinition.categories[0], "Category1");
    });

    it("must get exact subcategory definition", () => {
        const match = grammar.match("Category.Subcategory!", "exactElement");

        const node = semantics(match);

        const propertyDefinition = node.getPropertyDefinition() as PropertyDefinition;

        const isCategory = isExactCategoryDefinition(propertyDefinition);

        assert.isTrue(isCategory);

        if (!isCategory)
            return;

        assert.equal(propertyDefinition.categories.length, 2);
        assert.equal(propertyDefinition.categories[0], "Category");
        assert.equal(propertyDefinition.categories[1], "Subcategory");
    });

    it("must get exact subcategory definition 3 leveled", () => {
        const match = grammar.match("Category.Subcategory.[Deep Category]!", "exactElement");

        const node = semantics(match);

        const propertyDefinition = node.getPropertyDefinition() as PropertyDefinition;

        const isCategory = isExactCategoryDefinition(propertyDefinition);

        assert.isTrue(isCategory);

        if (!isCategory)
            return;

        assert.equal(propertyDefinition.categories.length, 3);
        assert.equal(propertyDefinition.categories[0], "Category");
        assert.equal(propertyDefinition.categories[1], "Subcategory");
        assert.equal(propertyDefinition.categories[2], "Deep Category");
    })
});