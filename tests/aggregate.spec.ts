import 'mocha';
import { assert } from 'chai';
import { QueryFactory } from '../src/queryFactory';
import { FilterSettings } from '../src/filterSettings';
import { ComplexFilterableElements } from './mocks/complexFilterableElements';

describe("Aggregated functions of LMV-QL", () => {
    const queryFactory = new QueryFactory();
    const complexElement = new ComplexFilterableElements({ name: "Top", props: {} }, { name: "Sub", props: { typeProperty: 1.3 } }, { name: "Element", props: { property: 5.7, name: "test", prop2: 1.3 } });
    const settings: FilterSettings = { displayUnits: "", displayUnitsPrecision: "", stringCaseSensitive: true, tolerance: 1e-3 };

    it("must get `count` aggregated expression", () => {
        const query = queryFactory.createQuery("count()");

        assert.equal(query.aggregateProperties.length, 1);

        const property = query.aggregateProperties[0];

        assert.equal(property.type, "count")
        assert.equal(property.elemValueFun(settings, complexElement), 1);
        assert.isUndefined(property.name);
    });

    it("must get `sum` aggregated expression", () => {
        const query = queryFactory.createQuery("sum(*.property)");

        assert.equal(query.aggregateProperties.length, 1);

        const property = query.aggregateProperties[0];

        assert.equal(property.type, "sum");
        assert.equal(property.elemValueFun(settings, complexElement), 5.7);
        assert.isUndefined(property.name);
    });
});