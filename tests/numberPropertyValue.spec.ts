import 'mocha';
import { assert } from 'chai';
import { FilterSettings } from '../src/filterSettings';
import { AttributeDefinition } from '../propertyDatabase';
import { getNumberPropertyValue } from '../src/numberPropertyValue';

describe("Number conversions tests", () => {
    const metricAttributeDefinition: AttributeDefinition = {
        category: "Dimensions",
        name: "Area",
        dataType: 3,
        displayName: "Area",
        dataTypeContext: "autodesk.unit.unit:squareMeters-1.0.1",
        precision: 17
    }

    it("must get original property if units are not specified in filter settings", () => {
        const filterSettings: FilterSettings = {
            displayUnits: "",
            displayUnitsPrecision: "",
            stringCaseSensitive: true,
            tolerance: 1e-3
        };

        const propertyValue = getNumberPropertyValue({ value: 5.7, attribute: metricAttributeDefinition }, filterSettings);

        assert.equal(propertyValue, 5.7);
    });

    it("must convert to display units", () => {
        const filterSettings: FilterSettings = {
            displayUnits: "ft",
            displayUnitsPrecision: "",
            stringCaseSensitive: true,
            tolerance: 1e-3
        };

        const propertyValue = getNumberPropertyValue({ value: 1, attribute: metricAttributeDefinition }, filterSettings);

        assert.isTrue(Math.abs(propertyValue - 10.76391) < 1e-4);
    });

    it("must apply display units precision", () => {
        const filterSettings: FilterSettings = {
            displayUnits: "",
            displayUnitsPrecision: 1,
            stringCaseSensitive: true,
            tolerance: 1e-3
        };

        const propertyValue = getNumberPropertyValue({ value: 5.713, attribute: metricAttributeDefinition }, filterSettings);

        assert.equal(propertyValue, 5.7);
    })
});