import { AttributeDefinition } from "../propertyDatabase";
import { ComputeExpressionSettings } from "./computeExpressionSettings";
import { FilterSettings } from "./filterSettings";
import { convertUnits, ModelUnits, ModelUnitTypes } from "./units";

export type NumberPropertyValue = {
    value: number;
    attribute?: AttributeDefinition;
};

export const getNumberPropertyValue = (property: NumberPropertyValue, filterSettings: FilterSettings | ComputeExpressionSettings) => {
    const propertyAttribute = property.attribute;

    if (!propertyAttribute)
        return property.value;

    const unitType = getPropertyUnitType(propertyAttribute);

    if (unitType === null)
        return property.value;

    const propertyUnits = ModelUnits[unitType.modelUnitType];

    const convertedValue = propertyMustBeConverted(property, filterSettings)
        ? convertUnits(propertyUnits, filterSettings.displayUnits, 1, property.value * (unitType.factor || 1), unitType.modificator)
        : property.value;

    return applyPrecision(convertedValue, filterSettings, propertyAttribute.precision);
}

const applyPrecision = (value: number, filterSettings: FilterSettings | ComputeExpressionSettings, attrubutePrecision: number): number => {
    // webpack://LMV/src/measurement/UnitFormatter.js formatNumber function uses toFixed(precision)
    // and it has some kind of financial style rounding, e.g
    // 1.675.toFixed(2) === "1.68" but
    // 1.575.toFixed(2) === "1.57", so we need to have the same logic

    const precision = getPrecision(filterSettings, attrubutePrecision);

    return new Number(value.toFixed(precision)).valueOf();
}

const getPrecision = (filterSettings: FilterSettings | ComputeExpressionSettings, attrubutePrecision: number) => {
    return typeof filterSettings.displayUnitsPrecision === "number" ? filterSettings.displayUnitsPrecision : attrubutePrecision;
}

const propertyMustBeConverted = (property: NumberPropertyValue, filterSettings: FilterSettings | ComputeExpressionSettings) => {
    return !!property.attribute
        && (property.attribute.dataType === 2 || property.attribute.dataType === 3) // int or double
        && !!property.attribute.dataTypeContext
        && filterSettings.displayUnits !== ""
}

type UnitsSystem = "metric" | "imperial";

type PropertyUnitType = {
    modelUnitType: ModelUnitTypes;
    system: UnitsSystem,
    modificator?: "square" | "cube" | undefined;
    factor?: number;
}

type ForgeUnits = {
    [key: string]: PropertyUnitType;
}

const forgeUnits: ForgeUnits = {
    centimeters: { modelUnitType: "CENTIMETER", system: "metric" },
    cubicCentimeters: { modelUnitType: "CENTIMETER", modificator: "cube", system: "metric" },
    cubicFeet: { modelUnitType: "FOOT", modificator: "cube", system: "imperial" },
    cubicInches: { modelUnitType: "FOOT", modificator: "cube", system: "imperial" },
    cubicMeters: { modelUnitType: "METER", modificator: "cube", system: "metric" },
    cubicMillimeters: { modelUnitType: "MILLIMETER", modificator: "cube", system: "metric" },
    decimeters: { modelUnitType: "METER", factor: 10, system: "metric" },
    feet: { modelUnitType: "FOOT", system: "imperial" },
    inches: { modelUnitType: "INCH", system: "imperial" },
    kilometers: { modelUnitType: "METER", factor: 1000, system: "metric" },
    liters: { modelUnitType: "METER", modificator: "cube", factor: 0.001, system: "metric" },
    meters: { modelUnitType: "METER", system: "metric" },
    millimeters: { modelUnitType: "MILLIMETER", system: "metric" },
    squareCentimeters: { modelUnitType: "CENTIMETER", modificator: "square", system: "metric" },
    squareFeet: { modelUnitType: "FOOT", modificator: "square", system: "imperial" },
    squareInches: { modelUnitType: "INCH", modificator: "square", system: "imperial" },
    squareMeters: { modelUnitType: "METER", modificator: "square", system: "metric" },
    squareMillimeters: { modelUnitType: "MILLIMETER", modificator: "square", system: "metric" },
    feetFractionalInches: { modelUnitType: "FOOT", system: "imperial" },
    fractionalInches: { modelUnitType: "INCH", system: "imperial" },
    metersCentimeters: { modelUnitType: "METER", system: "metric" },
    stationingFeet: { modelUnitType: "FOOT", system: "imperial" },
    stationingMeters: { modelUnitType: "METER", system: "metric" }
}

const getPropertyUnitType = (attributeDefinition: AttributeDefinition): PropertyUnitType | null => {
    const units = attributeDefinition.dataTypeContext;

    if (!units || !units.startsWith("autodesk.unit.unit:"))
        return null;

    const schemaName = units.split(":")[1];
    const unitId = schemaName.split("-")[0];

    const unitDef = forgeUnits[unitId];

    return unitDef || null;
}