import ohm from "ohm-js";
import { compareCategories } from "./elementCategoriesComparer";
import { IFilterableElement } from "./filterableElement";
import { FilterActionDict } from "./filtergrammar.ohm-bundle";
import { isAlmostEqual, isAlmostEqualOrLessThan, isAlmostEqualOrMoreThan, isLessThan, isMoreThan } from "./numbersComparison";

export type FilterSettings = {
    tolerance: number;
    stringCaseSensitive: boolean;
}

export type Filter = (settings: FilterSettings, element: IFilterableElement) => boolean;

export type ElementFilter = (element: IFilterableElement) => boolean;

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
    type: "simple";
    value: string;
}

export type SimpleNumberValue = {
    type: "number";
    value: number;
}

export type ArrayValue = {
    type: "array",
    value: "string";
}

export type PropertyDefinition = Category | Property | SimpleValue | SimpleNumberValue | ArrayValue;

const isNumberValueDefinition = (propertyDefinition: PropertyDefinition): propertyDefinition is SimpleNumberValue => {
    return propertyDefinition.type === "number";
}

type ComparisonExpression = (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode) => Filter;

const createComparisonExpression = (
    numberComparisonRule: (elementPropertyValue: number, constraint: number, filterSettings: FilterSettings) => boolean,
    textComparisonRule: (elementPropertyValue: string, constraint: string) => boolean): ComparisonExpression => {

    return (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode) => {
        const propertyDefinition: Property = propertyNode.getPropertyDefinition();
        const valueDefinition: (SimpleValue | SimpleNumberValue) = valueNode.getPropertyDefinition();

        if (isNumberValueDefinition(valueDefinition))
            return (filterSettings, element) => {
                const elementPropertyValue = element.getPropertyValue(propertyDefinition.propertyName, propertyDefinition.categories);

                if (typeof elementPropertyValue !== "number")
                    return false;

                return numberComparisonRule(elementPropertyValue, valueDefinition.value, filterSettings);
            };

        return (filterSettings, element) => {
            const elementPropertyValue = element.getPropertyValue(propertyDefinition.propertyName, propertyDefinition.categories);

            if (typeof elementPropertyValue !== "string")
                return false;

            const elementPropertyTestValue = filterSettings.stringCaseSensitive ? elementPropertyValue : elementPropertyValue.toLocaleLowerCase()

            const constraintTestValue = filterSettings.stringCaseSensitive ? valueDefinition.value : valueDefinition.value.toLocaleLowerCase();

            return textComparisonRule(elementPropertyTestValue, constraintTestValue);
        };
    }
}

export const compile: FilterActionDict<Filter> = {
    exactElement: (node) => {
        const propertyDefinition: Category = node.getPropertyDefinition();

        return (_, element) => compareCategories(element.categoriesList, propertyDefinition.categories);
    },

    EqualityExpr: createComparisonExpression(
        (elementPropertyValue, constraint, filterSettings) => isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance),
        (elementPropertyValue, constraint) => elementPropertyValue === constraint),

    LessThanExpr: createComparisonExpression(
        (elementPropertyValue, constraint, filterSettings) => isLessThan(elementPropertyValue, constraint, filterSettings.tolerance),
        (elementPropertyValue, constraint) => elementPropertyValue < constraint),

    LessThanOrEqualExpr: createComparisonExpression(
        (elementPropertyValue, constraint, filterSettings) => isAlmostEqualOrLessThan(elementPropertyValue, constraint, filterSettings.tolerance),
        (elementPropertyValue, constraint) => elementPropertyValue <= constraint),

    MoreThanExpr: createComparisonExpression(
        (elementPropertyValue, constraint, filterSettings) => isMoreThan(elementPropertyValue, constraint, filterSettings.tolerance),
        (elementPropertyValue, constraint) => elementPropertyValue > constraint),

    MoreThanOrEqualExpr: createComparisonExpression(
        (elementPropertyValue, constraint, filterSettings) => isAlmostEqualOrMoreThan(elementPropertyValue, constraint, filterSettings.tolerance),
        (elementPropertyValue, constraint) => elementPropertyValue >= constraint),
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

    exactElement_ofPropertySequence: (valueNode, _) => {
        const value: Category | Property = valueNode.getPropertyDefinition();

        if (value.type === "exact-category")
            return value;

        const categories = [...value.categories];

        categories.push(value.propertyName);

        return {
            type: "exact-category",
            categories
        }
    },

    property_ofPropertySequence: (sequenceNode, _, propertyNode) => {
        const sequence: Category | Property = sequenceNode.getPropertyDefinition();
        const property: SimpleValue = propertyNode.getPropertyDefinition();

        const categories = [...sequence.categories];

        if (sequence.type === "property-value")
            categories.push(sequence.propertyName);

        return {
            type: "property-value",
            propertyName: property.value,
            categories
        }
    },

    propertySequence: (node) => {
        const definition: Property | Category = node.getPropertyDefinition();

        if (definition.type === "property-value")
            return definition;

        const categories = [...definition.categories];

        const propertyName = categories.pop()!;

        return {
            type: "property-value",
            propertyName,
            categories
        }
    },

    directProperty_ofCategory: (categoriesNode, _, propertyNode) => {
        const category: SimpleValue = categoriesNode.getPropertyDefinition();
        const property: SimpleValue = propertyNode.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: [category.value, property.value]
        }
    },

    number: (node) => {
        return {
            type: "number",
            value: parseFloat(node.sourceString)
        }
    },

    textConst: (_1, valueNode, _2) => {
        return valueNode.getPropertyDefinition();
    },

    textValue: (valueNode) => {
        return {
            type: "simple",
            value: valueNode.sourceString
        }
    }
}