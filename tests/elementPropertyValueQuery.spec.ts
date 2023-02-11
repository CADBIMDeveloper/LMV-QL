import 'mocha';
import { assert } from 'chai';
import { ElementPropertyValueQueryFactory } from '../src/elementPropertyValueQueryFactory';
import { SimpleFilterableElement } from './mocks/simpleFilterableElement';

describe("Properties values queries test", () => {
    const propertyValueQueryFactory = new ElementPropertyValueQueryFactory();

    it("must get property value", () => {
        const valueQuery = propertyValueQueryFactory.createPropertyQuery("Category.property");

        assert.equal(valueQuery(new SimpleFilterableElement({ property: 5.7 }, ["Category"])), 5.7);
    });
});