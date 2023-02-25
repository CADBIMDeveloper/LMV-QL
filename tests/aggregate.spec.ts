import 'mocha';
import { assert } from 'chai';
import { QueryFactory } from '../src/queryFactory';
import { QuerySettings } from '../src/querySettings';
import { ComplexFilterableElements } from './mocks/complexFilterableElements';

describe("Aggregated functions of LMV-QL", () => {
    const queryFactory = new QueryFactory();
    const complexElement = new ComplexFilterableElements({ name: "Top", props: {} }, { name: "Sub", props: { typeProperty: 1.3 } }, { name: "Element", props: { property: 5.7, name: "test", prop2: 1.3 } });
    const settings: QuerySettings = { displayUnits: "", displayUnitsPrecision: "", stringCaseSensitive: true, tolerance: 1e-3 };

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

    it("must get `min` aggregated expression", () => {
        const query = queryFactory.createQuery("min(*.property)");

        assert.equal(query.aggregateProperties.length, 1);

        const property = query.aggregateProperties[0];

        assert.equal(property.type, "min");
        assert.equal(property.elemValueFun(settings, complexElement), 5.7);
        assert.isUndefined(property.name);
    });

    it("must get `max` aggregated expression", () => {
        const query = queryFactory.createQuery("max(*.property)");

        assert.equal(query.aggregateProperties.length, 1);

        const property = query.aggregateProperties[0];

        assert.equal(property.type, "max");
        assert.equal(property.elemValueFun(settings, complexElement), 5.7);
        assert.isUndefined(property.name);
    });

    it("must get `avg` aggregated expression", () => {
        const query = queryFactory.createQuery("avg(*.property)");

        assert.equal(query.aggregateProperties.length, 1);

        const property = query.aggregateProperties[0];

        assert.equal(property.type, "avg");
        assert.equal(property.elemValueFun(settings, complexElement), 5.7);
        assert.isUndefined(property.name);
    });

    it("must get named aggregated expressions", () => {
        const expressions = ["min", "max", "sum", "avg"] as const;

        for (const expression of expressions) {
            const query = queryFactory.createQuery(`${expression}(*.property) as value`);

            assert.equal(query.aggregateProperties.length, 1);

            const property = query.aggregateProperties[0];

            assert.equal(property.type, expression);
            assert.equal(property.elemValueFun(settings, complexElement), 5.7);
            assert.equal(property.name, "value");
        }

        assert.equal(queryFactory.createQuery("count() as cnt").aggregateProperties[0]?.name, "cnt");
    });

    it("must get aggregated expressions list (omited filter)", () => {
        const query = queryFactory.createQuery("sum(*.property), min(*.property)");

        assert.equal(query.aggregateProperties.length, 2);

        assert.equal(query.aggregateProperties[0].type, "sum");
        assert.equal(query.aggregateProperties[1].type, "min");

        for (const property of query.aggregateProperties)
            assert.equal(property.elemValueFun(settings, complexElement), 5.7);
    });

    it("must get aggregated expressions list with group operations (omited filter)", () => {
        const query = queryFactory.createQuery("sum(*.property), min(*.property) group by *.name");

        assert.equal(query.aggregateProperties.length, 2);

        assert.equal(query.aggregateProperties[0].type, "sum");
        assert.equal(query.aggregateProperties[1].type, "min");

        for (const property of query.aggregateProperties)
            assert.equal(property.elemValueFun(settings, complexElement), 5.7);
    });

    it("must get aggregated expressions list (with filter clause)", () => {
        const query = queryFactory.createQuery("category! -> sum(*.property), min(*.property)");

        assert.equal(query.aggregateProperties.length, 2);

        assert.equal(query.aggregateProperties[0].type, "sum");
        assert.equal(query.aggregateProperties[1].type, "min");

        for (const property of query.aggregateProperties)
            assert.equal(property.elemValueFun(settings, complexElement), 5.7);
    });

    it("must get aggregated expressions list (with filter clause and groups)", () => {
        const query = queryFactory.createQuery("category! -> sum(*.property), min(*.property) group by *.name");

        assert.equal(query.aggregateProperties.length, 2);

        assert.equal(query.aggregateProperties[0].type, "sum");
        assert.equal(query.aggregateProperties[1].type, "min");

        for (const property of query.aggregateProperties)
            assert.equal(property.elemValueFun(settings, complexElement), 5.7);
    });
});