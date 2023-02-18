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
    if (propertyMustBeConverted(property, filterSettings))
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
        && !property.attribute.dataTypeContext
        && filterSettings.displayUnits !== ""
}

type PropertyUnitType = {
    modelUnitType: ModelUnitTypes;
    modificator?: "square" | "cube" | undefined;
    factor?: number;
}

const getPropertyUnitType = (attributeDefinition: AttributeDefinition): PropertyUnitType | null => {
    return null;
}