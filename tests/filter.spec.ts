import 'mocha';
import { assert } from 'chai';
import { SimpleFilterableElement } from './mocks/simpleFilterableElement';
import { FilterFactory } from '../src/filterFactory';
import { ComplexFilterableElements } from './mocks/complexFilterableElements';

describe("Filter tests", () => {
    const sourceElements: SimpleFilterableElement[] = [
        new SimpleFilterableElement({
            numberValue1: 5.7,
            numberValue2: 1.3,
            stringValue: "test"
        }, ["Category1", "Subcategory1", "SubSub1"]),
        new SimpleFilterableElement({
            numberValue1: 5.7,
            numberValue2: 1.3,
            stringValue: "test"
        }, ["Category1", "Subcategory2"]),
        new SimpleFilterableElement({
            numberValue1: 5.7,
            numberValue2: 1.3,
            stringValue: "test"
        }, ["Category2", "Subcategory3"]),
        new SimpleFilterableElement({
            numberValue1: 5.7,
            numberValue2: 1.3,
            stringValue: "test"
        }, ["Category1", "Subcategory1", "SubSub2"])
    ];

    const filterFactory = new FilterFactory();
    const complexElement = new ComplexFilterableElements({ name: "Top", props: {} }, { name: "Sub", props: { typeProperty: 1.3 } }, { name: "Element", props: { property: 5.7 } });

    it("must filter for top level category", () => {
        const filter = filterFactory.createFilter("[Category1]!");

        assert.isTrue(filter(sourceElements[0]));
        assert.isTrue(filter(sourceElements[1]));
        assert.isFalse(filter(sourceElements[2]));
    });

    it("must filter for sub category", () => {
        const filter = filterFactory.createFilter("[Category1].Subcategory1!");

        assert.isTrue(filter(sourceElements[0]));
        assert.isFalse(filter(sourceElements[1]));
        assert.isFalse(filter(sourceElements[2]));
        assert.isTrue(filter(sourceElements[3]));
    });

    it("must filter for sub-sub category", () => {
        const filter = filterFactory.createFilter("[Category1].Subcategory1.SubSub1!");

        assert.isTrue(filter(sourceElements[0]));
        assert.isFalse(filter(sourceElements[1]));
        assert.isFalse(filter(sourceElements[2]));
        assert.isFalse(filter(sourceElements[3]));
    });

    it("must filter for number property equality", () => {
        const filter = filterFactory.createFilter("Category.property = 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Other Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 0.3 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is less than specified value", () => {
        const filter = filterFactory.createFilter("Category.property < 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is less or equal to specified value", () => {
        const filter = filterFactory.createFilter("Category.property <= 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is greater than specified value", () => {
        const filter = filterFactory.createFilter("Category.property > 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is greater or equal than specified value", () => {
        const filter = filterFactory.createFilter("Category.property >= 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property non-equality", () => {
        const filter = filterFactory.createFilter("Category.property != 5.7");

        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 1.3 }, ["Other Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 0.3 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for string property equality", () => {
        const filter = filterFactory.createFilter("Category.property = \"test\"");

        assert.isTrue(filter(new SimpleFilterableElement({ property: "test" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "Test" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Other Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for string property equality [case insensitive]", () => {
        const caseInsensitiveFilterFactory = new FilterFactory({ tolerance: 1e-3, stringCaseSensitive: false });

        const filter = caseInsensitiveFilterFactory.createFilter("Category.property = \"test\"");

        assert.isTrue(filter(new SimpleFilterableElement({ property: "test" }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: "Test" }, ["Category"])));
    });

    it("must filter for text comparison operators", () => {
        const testElement = new SimpleFilterableElement({ property: "abc" }, ["Category"]);

        assert.isTrue(filterFactory.createFilter("Category.property < \"abd\"")(testElement));
        assert.isTrue(filterFactory.createFilter("Category.property <= \"abd\"")(testElement));
        assert.isTrue(filterFactory.createFilter("Category.property > \"abb\"")(testElement));
        assert.isTrue(filterFactory.createFilter("Category.property >= \"abb\"")(testElement));
    });

    it("must filter for string property non-equality", () => {
        const filter = filterFactory.createFilter("Category.property != \"test\"");

        assert.isFalse(filter(new SimpleFilterableElement({ property: "test" }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: "Test" }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Other Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must support logical and filter", () => {
        const filter = filterFactory.createFilter("Category.property >= 1.3 && Category.property <= 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 5 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 0 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));

        const complexFilter = filterFactory.createFilter("Top.Sub.typeProperty = 1.3 && Top.Sub.Element.property = 5.7");

        assert.isTrue(complexFilter(complexElement));
    });

    it("must support logical or filter", () => {
        const filter = filterFactory.createFilter("Category.property < 1.3 || Category.property > 5.7");

        assert.isFalse(filter(new SimpleFilterableElement({ property: 5 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 0 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
    });

    it("must support logical operators priorities", () => {
        const filterOrAnd = filterFactory.createFilter("Category.property = 1.3 or Category.property > -2 and Category.property < 0");

        assert.isTrue(filterOrAnd(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isTrue(filterOrAnd(new SimpleFilterableElement({ property: -1 }, ["Category"])));

        const filterAndOr = filterFactory.createFilter("Category.property < 0 and Category.property > -2 or Category.property = 1.3");

        assert.isTrue(filterAndOr(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isFalse(filterAndOr(new SimpleFilterableElement({ property: 1.5 }, ["Category"])));
        assert.isTrue(filterAndOr(new SimpleFilterableElement({ property: -1.5 }, ["Category"])));

        const complexFilter = filterFactory.createFilter("Category.property >= 0 and Category.property <= 1.3 or Category.property>= 5.7 and Category.property <= 7");

        assert.isTrue(complexFilter(new SimpleFilterableElement({ property: 1 }, ["Category"])))
        assert.isTrue(complexFilter(new SimpleFilterableElement({ property: 6 }, ["Category"])))
    });

    it("must support brackets", () => {
        const simpleFilter = filterFactory.createFilter("(Category.property = 5.7)");

        assert.isTrue(simpleFilter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));

        const complexFilter = filterFactory.createFilter("(Category.p1 <= 1.3 or Category.p1 >= 5.7) and Category.p2 = 3");

        assert.isTrue(complexFilter(new SimpleFilterableElement({ p1: 1, p2: 3 }, ["Category"])));
        assert.isTrue(complexFilter(new SimpleFilterableElement({ p1: 6, p2: 3 }, ["Category"])));
        assert.isFalse(complexFilter(new SimpleFilterableElement({ p1: 4, p2: 3 }, ["Category"])));
        assert.isFalse(complexFilter(new SimpleFilterableElement({ p1: 1, p2: 5 }, ["Category"])));
    });

    it("must filter with top wildcard", () => {
        const filter = filterFactory.createFilter("*.property = 5.7");

        assert.isTrue(filter(complexElement));
    });
});