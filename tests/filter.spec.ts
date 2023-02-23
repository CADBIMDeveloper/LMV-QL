import 'mocha';
import { assert } from 'chai';
import { SimpleFilterableElement } from './mocks/simpleFilterableElement';
import { QueryFactory } from '../src/queryFactory';
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

    const filterFactory = new QueryFactory();
    const complexElement = new ComplexFilterableElements({ name: "Top", props: {} }, { name: "Sub", props: { typeProperty: 1.3 } }, { name: "Element", props: { property: 5.7, name: "test" } });

    it("must filter for top level category", () => {
        const filter = filterFactory.createQuery("[Category1]!").filter;

        assert.isTrue(filter(sourceElements[0]));
        assert.isTrue(filter(sourceElements[1]));
        assert.isFalse(filter(sourceElements[2]));
    });

    it("must filter for sub category", () => {
        const filter = filterFactory.createQuery("[Category1].Subcategory1!").filter;

        assert.isTrue(filter(sourceElements[0]));
        assert.isFalse(filter(sourceElements[1]));
        assert.isFalse(filter(sourceElements[2]));
        assert.isTrue(filter(sourceElements[3]));
    });

    it("must filter for sub-sub category", () => {
        const filter = filterFactory.createQuery("[Category1].Subcategory1.SubSub1!").filter;

        assert.isTrue(filter(sourceElements[0]));
        assert.isFalse(filter(sourceElements[1]));
        assert.isFalse(filter(sourceElements[2]));
        assert.isFalse(filter(sourceElements[3]));
    });

    it("must filter for number property equality", () => {
        const filter = filterFactory.createQuery("Category.property = 5.7").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Other Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 0.3 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is less than specified value", () => {
        const filter = filterFactory.createQuery("Category.property < 5.7").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is less or equal to specified value", () => {
        const filter = filterFactory.createQuery("Category.property <= 5.7").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is greater than specified value", () => {
        const filter = filterFactory.createQuery("Category.property > 5.7").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property which is greater or equal than specified value", () => {
        const filter = filterFactory.createQuery("Category.property >= 5.7").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for number property non-equality", () => {
        const filter = filterFactory.createQuery("Category.property != 5.7").filter;

        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 1.3 }, ["Other Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 0.3 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for string property equality", () => {
        const filter = filterFactory.createQuery("Category.property = \"test\"").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: "test" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "Test" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Other Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must filter for string property equality [case insensitive]", () => {
        const caseInsensitiveFilterFactory = new QueryFactory({ tolerance: 1e-3, stringCaseSensitive: false, displayUnits: "", displayUnitsPrecision: "" });

        const filter = caseInsensitiveFilterFactory.createQuery("Category.property = \"test\"").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: "test" }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: "Test" }, ["Category"])));
    });

    it("must filter for starts with operation", () => {
        const filter = filterFactory.createQuery("Category.property like \"some text%\"").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: "some text lorem ipsum dolorem..." }, ["Category"])));
    });

    it("must filter for ends with operation", () => {
        const filter = filterFactory.createQuery("Category.property like \"%some text\"").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: "lorem ipsum dolorem...some text" }, ["Category"])));
    });

    it("must filter like% with slashed %", () => {
        const filter = filterFactory.createQuery("Category.property like \"some \\% text%\"").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: "some % text lorem ipsum dolorem..." }, ["Category"])))
    });

    it("must filter %like with slashed %", () => {
        const filter = filterFactory.createQuery("Category.property like \"%some \\% text\"").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: "lorem ipsum dolorem...some % text" }, ["Category"])));
    })

    it("must filter with quoted texts", () => {
        const testElement = new SimpleFilterableElement({ property: 'some "quoted" text' }, ["Category"]);

        const filter = filterFactory.createQuery('Category.property = "some \\"quoted\\" text"').filter;

        assert.isTrue(filter(testElement));
    });

    it("must filter for text comparison operators", () => {
        const testElement = new SimpleFilterableElement({ property: "abc" }, ["Category"]);

        assert.isTrue(filterFactory.createQuery("Category.property < \"abd\"").filter(testElement));
        assert.isTrue(filterFactory.createQuery("Category.property <= \"abd\"").filter(testElement));
        assert.isTrue(filterFactory.createQuery("Category.property > \"abb\"").filter(testElement));
        assert.isTrue(filterFactory.createQuery("Category.property >= \"abb\"").filter(testElement));
    });

    it("must filter for string property non-equality", () => {
        const filter = filterFactory.createQuery("Category.property != \"test\"").filter;

        assert.isFalse(filter(new SimpleFilterableElement({ property: "test" }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: "Test" }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Other Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({}, ["Category"])));
    });

    it("must support logical and filter", () => {
        const filter = filterFactory.createQuery("Category.property >= 1.3 && Category.property <= 5.7").filter;

        assert.isTrue(filter(new SimpleFilterableElement({ property: 5 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 0 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));

        const complexFilter = filterFactory.createQuery("Top.Sub.typeProperty = 1.3 && Top.Sub.Element.property = 5.7").filter;

        assert.isTrue(complexFilter(complexElement));
    });

    it("must support logical or filter", () => {
        const filter = filterFactory.createQuery("Category.property < 1.3 || Category.property > 5.7").filter;

        assert.isFalse(filter(new SimpleFilterableElement({ property: 5 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 0 }, ["Category"])));
        assert.isTrue(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
    });

    it("must support logical operators priorities", () => {
        const filterOrAnd = filterFactory.createQuery("Category.property = 1.3 or Category.property > -2 and Category.property < 0").filter;

        assert.isTrue(filterOrAnd(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isTrue(filterOrAnd(new SimpleFilterableElement({ property: -1 }, ["Category"])));

        const filterAndOr = filterFactory.createQuery("Category.property < 0 and Category.property > -2 or Category.property = 1.3").filter;

        assert.isTrue(filterAndOr(new SimpleFilterableElement({ property: 1.3 }, ["Category"])));
        assert.isFalse(filterAndOr(new SimpleFilterableElement({ property: 1.5 }, ["Category"])));
        assert.isTrue(filterAndOr(new SimpleFilterableElement({ property: -1.5 }, ["Category"])));

        const complexFilter = filterFactory.createQuery("Category.property >= 0 and Category.property <= 1.3 or Category.property>= 5.7 and Category.property <= 7").filter;

        assert.isTrue(complexFilter(new SimpleFilterableElement({ property: 1 }, ["Category"])))
        assert.isTrue(complexFilter(new SimpleFilterableElement({ property: 6 }, ["Category"])))
    });

    it("must support brackets", () => {
        const simpleFilter = filterFactory.createQuery("(Category.property = 5.7)").filter;

        assert.isTrue(simpleFilter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));

        const complexFilter = filterFactory.createQuery("(Category.p1 <= 1.3 or Category.p1 >= 5.7) and Category.p2 = 3").filter;

        assert.isTrue(complexFilter(new SimpleFilterableElement({ p1: 1, p2: 3 }, ["Category"])));
        assert.isTrue(complexFilter(new SimpleFilterableElement({ p1: 6, p2: 3 }, ["Category"])));
        assert.isFalse(complexFilter(new SimpleFilterableElement({ p1: 4, p2: 3 }, ["Category"])));
        assert.isFalse(complexFilter(new SimpleFilterableElement({ p1: 1, p2: 5 }, ["Category"])));
    });

    it("must filter with top wildcard", () => {
        const filter = filterFactory.createQuery("*.property = 5.7").filter;

        assert.isTrue(filter(complexElement));
    });

    it("must filter with wildcards", () => {
        assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("Top.*.Element.property = 5.7").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("Top.Sub.*.property = 5.7").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("Top.*.*.property = 5.7").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("*.Sub.*.property = 5.7").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("*.typeProperty = 1.3").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("*.name = \"test\"").filter(complexElement));
    });

    it("queries with omitted filter (e.g. select only, aggregated,...) must get filter, which returns true for any element", () => {
        assert.isTrue(filterFactory.createQuery("*.property").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("*.category.property").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("*.property as property_name").filter(complexElement));

        assert.isTrue(filterFactory.createQuery("*.property, *.name").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("*.property, *.name as name").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("*.property as prop, *.name as name").filter(complexElement));

        assert.isTrue(filterFactory.createQuery("sum(*.property)").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("sum(*.property) as s").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("sum(*.property) as s, min(*.property) as min").filter(complexElement));
    });

    it("must get filtering parts from queries", () => {
        assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> *.property").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> *.property as prop").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> *.property, *.name").filter(complexElement));
        assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> *.property as prop, *.name as name").filter(complexElement));
        assert.isFalse(filterFactory.createQuery("Top.*.property = 5.8 -> *.property as prop, *.name as name").filter(complexElement));

        // assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> sum(*.property)").filter(complexElement));
        // assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> sum(*.property) as sum").filter(complexElement));
        // assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> sum(*.property) as sum, min(*.property) as min").filter(complexElement));
        // assert.isFalse(filterFactory.createQuery("Top.*.property = 5.8 -> sum(*.property) as sum, min(*.property) as min").filter(complexElement));

        // assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> sum(*.property) group by *.name").filter(complexElement));
        // assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> sum(*.property), min(*.property) group by *.name").filter(complexElement));
        // assert.isTrue(filterFactory.createQuery("Top.*.property = 5.7 -> sum(*.property), min(*.property) group by *.name, *.otherProp").filter(complexElement));
        // assert.isFalse(filterFactory.createQuery("Top.*.property = 5.8 -> sum(*.property), min(*.property) group by *.name, *.otherProp").filter(complexElement));
    });
});