import { IFilterableElement } from "./filterableElement";
import { FilterActionDict } from "./filtergrammar.ohm-bundle";

export type Filter = (element: IFilterableElement) => boolean;

type Category = {
    type: "exact-category";
    categories: string[];
}

type Property = {
    type: "property-value";
    propertyName: string;
    categories: string[];
}

export const compile: FilterActionDict<Filter> = {

}

export const getPropertyDefinition: FilterActionDict<Category | Property> = {

}