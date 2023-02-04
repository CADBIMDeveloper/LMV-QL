import 'mocha';
import { assert } from 'chai';
import { SimpleFilterableElement } from './mocks/simpleFilterableElement';

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
        }, ["Category2", "Subcategory3"])
    ]
});