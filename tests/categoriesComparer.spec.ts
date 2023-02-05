import 'mocha';
import { assert } from 'chai';
import { compareCategories } from '../src/elementCategoriesComparer';

describe("Categories comparer", () => {
    it("must perform simple compare (without wildcards)", () => {
        const elemCategories = ["a", "b", "c", "d"];

        const templateCategories = ["a", "b", "c"];

        assert.isTrue(compareCategories(elemCategories, templateCategories));
    });

    it("must perform compare with wildcards", () => {
        const elemCategories = ["a", "b", "c", "d"];

        assert.isTrue(compareCategories(elemCategories, ["*", "d"]));
        assert.isTrue(compareCategories(elemCategories, ["a", "*", "d"]));
        assert.isTrue(compareCategories(elemCategories, ["a", "b", "*"]));
        assert.isTrue(compareCategories(elemCategories, ["*", "b", "*", "d"]));
    });
});