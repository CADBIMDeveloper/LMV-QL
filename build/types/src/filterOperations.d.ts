import { IFilterableElement } from "./filterableElement";
import { FilterActionDict } from "./filtergrammar.ohm-bundle";
import { FilterSettings } from "./filterSettings";
export type Filter = (settings: FilterSettings, element: IFilterableElement) => boolean;
export type ElementFilter = (element: IFilterableElement) => boolean;
export type ElementPropertyValueQuery = (element: IFilterableElement) => number | string | undefined;
export type Category = {
    type: "exact-category";
    categories: string[];
};
export type Property = {
    type: "property-value";
    propertyName: string;
    categories: string[];
};
export type SimpleValue = {
    type: "simple";
    value: string;
};
export type SimpleNumberValue = {
    type: "number";
    value: number;
};
export type ArrayValue = {
    type: "array";
    value: "string";
};
export type PropertyDefinition = Category | Property | SimpleValue | SimpleNumberValue | ArrayValue;
export declare const compile: FilterActionDict<Filter>;
export declare const getPropertyDefinition: FilterActionDict<PropertyDefinition>;
export declare const getPropertyValue: FilterActionDict<ElementPropertyValueQuery>;
