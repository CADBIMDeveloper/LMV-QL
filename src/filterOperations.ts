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

export type PropertyDefinition = Category | Property;

export const compile: FilterActionDict<Filter> = {

}

export const getPropertyDefinition: FilterActionDict<PropertyDefinition> = {
    exactElement_ofCategory: (parent, _) => {
        return parent.getPropertyDefinition();
    },
}