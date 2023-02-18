import { AttributeDefinition } from "../propertyDatabase";
import { FilterSettings } from "./filterSettings";

export type NumberPropertyValue = {
    value: number;
    attribute?: AttributeDefinition;
};

export const getNumberPropertyValue = (property: NumberPropertyValue, filterSettings: FilterSettings) => {
    return property.value;
}