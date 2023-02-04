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

export type ArrayValue = {
    type: "array",
    value: "string";
}

export type PropertyDefinition = Category | Property | SimpleValue | ArrayValue;

export const compile: FilterActionDict<Filter> = {

}

export const getPropertyDefinition: FilterActionDict<PropertyDefinition> = {
    exactElement_ofCategory: (parentNode, _) => {
        const category: SimpleValue = parentNode.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: [category.value]
        };
    },

    categoryOrProperty_inBrackets: (_, valueNode, _1) => {
        return {
            type: "simple",
            value: valueNode.sourceString
        }
    },

    categoryOrProperty_value: (valueNode) => {
        return {
            type: "simple",
            value: valueNode.sourceString
        }
    },

    exactElement_ofPropertySequence: (value, _) => {
        return value.getPropertyDefinition();
    },

    directProperty_ofCategory: (categoriesNode, _, propertyNode) => {
        const category: SimpleValue = categoriesNode.getPropertyDefinition();
        const property: SimpleValue = propertyNode.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: [category.value, property.value]
        }
    }
}