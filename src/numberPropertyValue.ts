import { AttributeDefinition } from "../propertyDatabase";
import { FilterSettings } from "./filterSettings";
import { convertUnits, ModelUnits, ModelUnitTypes } from "./units";

export type NumberPropertyValue = {
    value: number;
    attribute?: AttributeDefinition;
};

export const getNumberPropertyValue = (property: NumberPropertyValue, filterSettings: FilterSettings) =>
    applyPrecision(convertValue(property, filterSettings), property.attribute, filterSettings);

const convertValue = (property: NumberPropertyValue, filterSettings: FilterSettings): number => {
    if (!propertyMustBeConverted(property, filterSettings))
        return property.value;

    const unitType = getPropertyUnitType(property.attribute!);

    if (unitType === null)
        return property.value;

    const propertyUnits = ModelUnits[unitType.modelUnitType];

    return convertUnits(propertyUnits, filterSettings.displayUnits, 1, property.value * (unitType.factor || 1), unitType.modificator);
}

const applyPrecision = (value: number, attributeDefinition: AttributeDefinition | undefined, filterSettings: FilterSettings): number => {
    // TODO
    return value;
}

const propertyMustBeConverted = (property: NumberPropertyValue, filterSettings: FilterSettings) => {
    return !!property.attribute
        && (property.attribute.dataType === 2 || property.attribute.dataType === 3) // int or double
        && !!property.attribute.dataTypeContext
        && filterSettings.displayUnits !== ""
}

type PropertyUnitType = {
    modelUnitType: ModelUnitTypes;
    modificator?: "square" | "cube" | undefined;
    factor?: number;
}

type ForgeUnits = {
    [key: string]: PropertyUnitType;
}

const forgeUnits: ForgeUnits = {
    centimeters: { modelUnitType: "CENTIMETER" },
    cubicCentimeters: { modelUnitType: "CENTIMETER", modificator: "cube" },
    cubicFeet: { modelUnitType: "FOOT", modificator: "cube" },
    cubicInches: { modelUnitType: "FOOT", modificator: "cube" },
    cubicMeters: { modelUnitType: "METER", modificator: "cube" },
    cubicMillimeters: { modelUnitType: "MILLIMETER", modificator: "cube" },
    decimeters: { modelUnitType: "METER", factor: 10 },
    feet: { modelUnitType: "FOOT" },
    inches: { modelUnitType: "INCH" },
    kilometers: { modelUnitType: "METER", factor: 1000 },
    liters: { modelUnitType: "METER", modificator: "cube", factor: 0.001 },
    meters: { modelUnitType: "METER" },
    squareCentimeters: { modelUnitType: "CENTIMETER", modificator: "square" },
    squareFeet: { modelUnitType: "FOOT", modificator: "square" },
    squareInches: { modelUnitType: "INCH", modificator: "square" },
    squareMeters: { modelUnitType: "METER", modificator: "square" },
    squareMillimeters: { modelUnitType: "MILLIMETER", modificator: "square" },
    feetFractionalInches: { modelUnitType: "FOOT" },
    fractionalInches: { modelUnitType: "INCH" },
    metersCentimeters: { modelUnitType: "METER" },
    stationingFeet: { modelUnitType: "FOOT" },
    stationingMeters: { modelUnitType: "METER" }
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