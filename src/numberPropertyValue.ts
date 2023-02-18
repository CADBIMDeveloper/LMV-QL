import { AttributeDefinition } from "../propertyDatabase";

export type NumberPropertyValue = {
    value: number;
    attribute?: AttributeDefinition;
};

export const getNumberPropertyValue = (property: NumberPropertyValue) => {
    return property.value;
}