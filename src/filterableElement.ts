import { AttributeDefinition } from "../propertyDatabase";

export type PropertyValue = {
    value: string | number | undefined;
    attribute?: AttributeDefinition;
}

export interface IFilterableElement {
    get categoriesList(): string[];
    
    getPropertyValue(propertyName: string, categories: string[]): PropertyValue;
}