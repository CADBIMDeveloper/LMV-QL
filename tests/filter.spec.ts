import 'mocha';
import { assert } from 'chai';
import { SimpleFilterableElement } from './mocks/simpleFilterableElement';
import { FilterFactory } from '../src/filterFactory';

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

    it("must filter for property number equality", () => {
        const filter = filterFactory.createFilter("Category.property = 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Other Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 0.3 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ }, ["Category"])));
    });

    it("must filter for number property which is less than specified value", () => {
        const filter = filterFactory.createFilter("Category.property < 5.7");

        assert.isTrue(filter(new SimpleFilterableElement({ property: 4 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 5.7 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: 6 }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ property: "abc" }, ["Category"])));
        assert.isFalse(filter(new SimpleFilterableElement({ }, ["Category"])));
    })
});