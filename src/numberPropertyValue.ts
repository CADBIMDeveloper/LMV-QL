import { AttributeDefinition } from "../propertyDatabase";
import { FilterSettings } from "./filterSettings";

export type NumberPropertyValue = {
    value: number;
    attribute?: AttributeDefinition;
};

export const getNumberPropertyValue = (property: NumberPropertyValue, filterSettings: FilterSettings) => {
    const value = propertyMustBeConverted(property, filterSettings) ? convertValue(property, filterSettings) : property.value;
    
    return applyPrecision(value, property.attribute, filterSettings);
}

const convertValue = (property: NumberPropertyValue, filterSettings: FilterSettings): number => {
    // TODO
    return property.value;
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