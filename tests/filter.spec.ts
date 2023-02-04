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
});