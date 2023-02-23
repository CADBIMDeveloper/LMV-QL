import 'mocha';
import { assert } from 'chai';
import { QueryFactory } from '../src/queryFactory';
import { ComplexFilterableElements } from './mocks/complexFilterableElements';
import { FilterSettings } from '../src/filterSettings';

describe("Select clause of LMV-QL tests", () => {
    const queryFactory = new QueryFactory();
    const complexElement = new ComplexFilterableElements({ name: "Top", props: {} }, { name: "Sub", props: { typeProperty: 1.3 } }, { name: "Element", props: { property: 5.7, name: "test", prop2: 1.3 } });
    const settings: FilterSettings = { displayUnits: "", displayUnitsPrecision: "", stringCaseSensitive: true, tolerance: 1e-3 };

    it("must get simple single unnamed properties from the query string", () => {
        const query = queryFactory.createQuery("*.property");

        assert.equal(query.selectProperties.length, 1);
        assert.isUndefined(query.selectProperties[0].name);

        const propertyValue = query.selectProperties[0].fun(settings, complexElement);
        assert.equal(propertyValue, 5.7);
    });

    it("must get simple single named property from the query string", () => {
        const query = queryFactory.createQuery("*.property as property_name");

        assert.equal(query.selectProperties.length, 1);

        assert.equal(query.selectProperties[0].name, "property_name");

        const propertyValue = query.selectProperties[0].fun(settings, complexElement);
        assert.equal(propertyValue, 5.7);
    });

    it("must get properties list from the query string", () => {
        const query = queryFactory.createQuery("*.property as prop, *.name as name, *.prop2 as other_prop");

        assert.equal(query.selectProperties.length, 3);
        assert.equal(query.selectProperties[0].name, "prop");
        assert.equal(query.selectProperties[1].name, "name");
        assert.equal(query.selectProperties[2].name, "other_prop");
    });
});