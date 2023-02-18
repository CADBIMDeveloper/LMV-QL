import { AttributeDefinition } from "../propertyDatabase";
import { FilterSettings } from "./filterSettings";
import { convertUnits, ModelUnits, ModelUnitTypes } from "./units";

export type NumberPropertyValue = {
    value: number;
    attribute?: AttributeDefinition;
};

export const getNumberPropertyValue = (property: NumberPropertyValue, filterSettings: FilterSettings) => {
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

    return applyPrecision(convertedValue, unitType, filterSettings, propertyAttribute.precision);
}

const applyPrecision = (value: number, unitType: PropertyUnitType, filterSettings: FilterSettings, attrubutePrecision: number): number => {
    return isSimpleNumberFormatting(unitType, filterSettings)
        ? applySimpleNumberPrecisionFormatting(value, filterSettings, attrubutePrecision)
        : applyImperialNumberPrecisionFormatting(value, filterSettings, attrubutePrecision);
}

const applySimpleNumberPrecisionFormatting = (value: number, filterSettings: FilterSettings, attrubutePrecision: number): number => {
    // webpack://LMV/src/measurement/UnitFormatter.js formatNumber function uses toFixed(precision)
    // and it has some kind of financial style rounding, e.g
    // 1.675.toFixed(2) === "1.68" but
    // 1.575.toFixed(2) === "1.57", so we need to have the same logic

    const precision = getPrecision(filterSettings, attrubutePrecision);

    return new Number(value.toFixed(precision)).valueOf();
}

const applyImperialNumberPrecisionFormatting = (value: number, filterSettings: FilterSettings, attrubutePrecision: number): number => {
    console.warn("Imperial apply precision is not implemented yet");

    return value;
}

const getPrecision = (filterSettings: FilterSettings, attrubutePrecision: number) => {
    return typeof filterSettings.displayUnitsPrecision === "number" ? filterSettings.displayUnitsPrecision : attrubutePrecision;
}

const isSimpleNumberFormatting = (unitType: PropertyUnitType, filterSettings: FilterSettings) => {
    if (unitType.modificator) // square an cubic are formatted as regular numbers
        return true;

    switch (filterSettings.displayUnits) {
        case "":
            return unitType.system === "metric";

        // taken from Autodesk.Viewing.Private.displayUnitsEnum
        case "mm":
        case "cm":
        case "m":
        case "m-and-cm":
        case "pt":
            return true;

        case "in":
        case "ft":
        case "ft-and-fractional-in":
        case "ft-and-decimal-in":
        case "decimal-in":
        case "decimal-ft":
        case "fractional-in":
            return false;

        default:
            throw new Error("LMV-QL doesn't support \"" + filterSettings.displayUnits + "\" display units");
    }
}

const propertyMustBeConverted = (property: NumberPropertyValue, filterSettings: FilterSettings) => {
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