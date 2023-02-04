import { IFilterableElement } from "./filterableElement";
import { FilterActionDict } from "./filtergrammar.ohm-bundle";

export type Filter = (element: IFilterableElement) => boolean;

export type Category = {
    type: "exact-category";
    categories: string[];
}

export type Property = {
    type: "property-value";
    propertyName: string;
    categories: string[];
}

export type SimpleValue = {
    type: "simple",
    value: string;
}

export type PropertyDefinition = Category | Property | SimpleValue;

export const compile: FilterActionDict<Filter> = {

}

export const getPropertyDefinition: FilterActionDict<PropertyDefinition> = {
    exactElement_ofCategory: (parent, _) => {
        const category: SimpleValue = parent.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: [category.value]
        };
    },

    categoryOrProperty_inBrackets: (_, value, _1) => {
        return {
            type: "simple",
            value: value.sourceString
        }
    }
}