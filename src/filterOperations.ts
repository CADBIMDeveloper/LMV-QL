import * as ohm from "ohm-js";
import { compareCategories } from "./elementCategoriesComparer";
import { expandTemplateCategoriesForValue } from "./expandedWildcategoriesFactory";
import { IFilterableElement } from "./filterableElement";
import { FilterActionDict } from "./filtergrammar.ohm-bundle";
import { FilterSettings } from "./filterSettings";
import { isAlmostEqual, isAlmostEqualOrLessThan, isAlmostEqualOrMoreThan, isLessThan, isMoreThan } from "./numbersComparison";

export type Filter = (settings: FilterSettings, element: IFilterableElement) => boolean;

export type ElementFilter = (element: IFilterableElement) => boolean;

export type ElementPropertyValueQuery = (element: IFilterableElement) => number | string | undefined;

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

const isNumber = (value: number | string | undefined): value is number => typeof value === "number";
const isString = (value: number | string | undefined): value is string => typeof value === "string";

type ComparisonExpression = (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode) => Filter;

const replaceAll = (value: string, searchValue: string, replacer: string) => {
    while(value.indexOf(searchValue) >= 0)
        value = value.replace(searchValue, replacer);

    return value;
}

const createComparisonExpression = (
    numberComparisonRule: (elementPropertyValue: number, constraint: number, filterSettings: FilterSettings) => boolean,
    textComparisonRule: (elementPropertyValue: string, constraint: string) => boolean): ComparisonExpression => {

    return (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode) => {
        const propertyDefinition: Property = propertyNode.getPropertyDefinition();
        const valueDefinition: (SimpleValue | SimpleNumberValue) = valueNode.getPropertyDefinition();

        if (isNumberValueDefinition(valueDefinition))
            return (filterSettings, element) => {
                if (!compareCategories(element.categoriesList, propertyDefinition.categories))
                    return false;

                const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);

                return categoryTemplates
                    .map(x => element.getPropertyValue(propertyDefinition.propertyName, x))
                    .filter(isNumber)
                    .reduce((acc, elem) => acc || numberComparisonRule(elem, valueDefinition.value, filterSettings), false);
            };

        return (filterSettings, element) => {
            if (!compareCategories(element.categoriesList, propertyDefinition.categories))
                return false;

            const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);

            const constraintTestValue = filterSettings.stringCaseSensitive ? valueDefinition.value : valueDefinition.value.toLocaleLowerCase();

            return categoryTemplates
                .map(x => element.getPropertyValue(propertyDefinition.propertyName, x))
                .filter(isString)
                .map(x => filterSettings.stringCaseSensitive ? x : x.toLocaleLowerCase())
                .reduce((acc, elem) => acc || textComparisonRule(elem, constraintTestValue), false);
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

    BoolAnd_and: (leftNode, _, rightNode) => (filterSettings, element) =>
        leftNode.compile()(filterSettings, element) && rightNode.compile()(filterSettings, element),

    BoolOr_or: (leftNode, _, rightNode) => (filterSettings, element) =>
        leftNode.compile()(filterSettings, element) || rightNode.compile()(filterSettings, element),

    PriExp_paren: (_1, node, _2) => (filterSettings, element) => node.compile()(filterSettings, element),

    NonEqualityExpr: createComparisonExpression(
        (elementPropertyValue, constraint, filterSettings) => !isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance),
        (elementPropertyValue, constraint) => elementPropertyValue !== constraint)
}

const appendPropertyToSequence = (sequenceNode: ohm.NonterminalNode, propertyNode: ohm.NonterminalNode): PropertyDefinition => {
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
}

const convertToCategoriesNode = (sequenceNode: ohm.NonterminalNode): PropertyDefinition => {
    const value: Category | Property = sequenceNode.getPropertyDefinition();

    if (value.type === "exact-category")
        return value;

    const categories = [...value.categories];

    categories.push(value.propertyName);

    return {
        type: "exact-category",
        categories
    }
}

const convertToPropertiesNode = (sequenceNode: ohm.NonterminalNode): PropertyDefinition => {
    const definition: Property | Category = sequenceNode.getPropertyDefinition();

    if (definition.type === "property-value")
        return definition;

    const categories = [...definition.categories];

    const propertyName = categories.pop()!;

    return {
        type: "property-value",
        propertyName,
        categories
    }
}

const createSimpleValue = (valueNode: ohm.NonterminalNode, transform?: (sourceString: string) => string): PropertyDefinition => {
    const value = typeof transform === "function" ? transform(valueNode.sourceString) : valueNode.sourceString;

    return {
        type: "simple",
        value: value
    }
}

export const getPropertyDefinition: FilterActionDict<PropertyDefinition> = {
    exactElement_ofCategory: (parentNode, _) => {
        const category: SimpleValue = parentNode.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: [category.value]
        };
    },

    categoryOrProperty_inBrackets: (_, valueNode, _1) => createSimpleValue(valueNode),

    categoryOrProperty_value: (valueNode) => createSimpleValue(valueNode),

    exactElement_ofPropertySequence: (sequenceNode, _) => convertToCategoriesNode(sequenceNode),

    property_ofPropertySequence: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),

    property_ofDirectAny: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),

    property_ofDirectAnyPropertySequence: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),

    directAnyProperty_ofCategory: (sequenceNode, _1, _2) => {
        const category: SimpleValue = sequenceNode.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: [category.value, "*"]
        }
    },

    directAnyPropertySequence: (sequenceNode, _1, _2) => convertToCategoriesNode(sequenceNode),

    directAnyProperty_sequenced: (sequenceNode, _1, _2) => {
        const sequence = convertToCategoriesNode(sequenceNode) as Category;

        const categories = [...sequence.categories];

        categories.push("*");

        return {
            type: "exact-category",
            categories
        }
    },

    propertySequence: (node) => convertToPropertiesNode(node),

    directProperty_ofCategory: (categoriesNode, _, propertyNode) => {
        const category: SimpleValue = categoriesNode.getPropertyDefinition();
        const property: SimpleValue = propertyNode.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: [category.value, property.value]
        }
    },

    directProperty_ofAnyProperty: (_1, _2, propertyNode) => {
        const property: SimpleValue = propertyNode.getPropertyDefinition();

        return {
            type: "exact-category",
            categories: ["*", property.value]
        };
    },

    number: (node) => {
        return {
            type: "number",
            value: parseFloat(node.sourceString)
        }
    },

    textConst: (_1, valueNode, _2) => valueNode.getPropertyDefinition(),

    startsWithConst: (_1, valueNode, _2) => valueNode.getPropertyDefinition(),

    endsWithConst: (_1, valueNode, _2) => valueNode.getPropertyDefinition(),

    textValue: (valueNode) => createSimpleValue(valueNode, value => replaceAll(value, '\\"', '"')),

    likeTextValue: (valueNode) => createSimpleValue(valueNode, value => replaceAll(value, '\\"', '"'))
}

export const getPropertyValue: FilterActionDict<ElementPropertyValueQuery> = {
    propertySequence: (node) => {
        const propertyDefinition = convertToPropertiesNode(node) as Property;

        return (element) => {
            if (!compareCategories(element.categoriesList, propertyDefinition.categories))
                return undefined;

            const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);

            return categoryTemplates
                .map(x => element.getPropertyValue(propertyDefinition.propertyName, x))
                .find(x => x !== undefined);
        };
    }
}