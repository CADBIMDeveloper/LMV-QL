import * as ohm from "ohm-js";
import { compareCategories } from "./elementCategoriesComparer";
import { expandTemplateCategoriesForValue } from "./expandedWildcategoriesFactory";
import { IQueryableElement, PropertyValue } from "./queryableElement";
import { FilterActionDict } from "./grammar.ohm-bundle";
import { QuerySettings } from "./querySettings";
import { getNumberPropertyValue, NumberPropertyValue } from "./numberPropertyValue";
import { isAlmostEqual, isAlmostEqualOrLessThan, isAlmostEqualOrMoreThan, isLessThan, isMoreThan } from "./numbersComparison";

export type Filter = (settings: QuerySettings, element: IQueryableElement) => boolean;

export type ElementFilter = (element: IQueryableElement) => boolean;

export type ElementQuery = {
    filter: ElementFilter;
    selectProperties: SelectValueQuery[];
    aggregateProperties: AggregatedValueQuery[];
}

export type SelectValueQuery = {
    fun: (settings: QuerySettings, element: IQueryableElement) => number | string | undefined;
    name?: string;
}

export type AggregatedValueFunctionType = "count" | "sum" | "min" | "max" | "avg";

export type AggregatedValueQuery = {
    type: AggregatedValueFunctionType;
    elemValueFun: (settings: QuerySettings, element: IQueryableElement) => number | string | undefined;
    name?: string;
}

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

const isNumberProperty = (value: PropertyValue): value is NumberPropertyValue => typeof value.value === "number";
const isString = (value: number | string | undefined): value is string => typeof value === "string";

type ComparisonExpression = (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode) => Filter;

const createComparisonExpression = (
    numberComparisonRule: (elementPropertyValue: number, constraint: number, filterSettings: QuerySettings) => boolean,
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
                    .filter(isNumberProperty)
                    .map(x => getNumberPropertyValue(x, filterSettings))
                    .reduce((acc, elem) => acc || numberComparisonRule(elem, valueDefinition.value, filterSettings), false);
            };

        return (filterSettings, element) => {
            if (!compareCategories(element.categoriesList, propertyDefinition.categories))
                return false;

            const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);

            const constraintTestValue = filterSettings.stringCaseSensitive ? valueDefinition.value : valueDefinition.value.toLocaleLowerCase();

            return categoryTemplates
                .map(x => element.getPropertyValue(propertyDefinition.propertyName, x).value)
                .filter(isString)
                .map(x => filterSettings.stringCaseSensitive ? x : x.toLocaleLowerCase())
                .reduce((acc, elem) => acc || textComparisonRule(elem, constraintTestValue), false);
        };
    }
}

export const compileFilter: FilterActionDict<Filter> = {
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
        leftNode.compileFilter()(filterSettings, element) && rightNode.compileFilter()(filterSettings, element),

    BoolOr_or: (leftNode, _, rightNode) => (filterSettings, element) =>
        leftNode.compileFilter()(filterSettings, element) || rightNode.compileFilter()(filterSettings, element),

    PriExp_paren: (_1, node, _2) => (filterSettings, element) => node.compileFilter()(filterSettings, element),

    NonEqualityExpr: (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode) => {
        const equalityExpression = createComparisonExpression(
            (elementPropertyValue, constraint, filterSettings) => isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance),
            (elementPropertyValue, constraint) => elementPropertyValue === constraint)

        const equalityCheck = equalityExpression(propertyNode, _, valueNode);

        return (settings, element) => !equalityCheck(settings, element);
    },

    NotExpr: (_1, _2, filterExpr, _3) => (filterSettings, element) => !filterExpr.compileFilter()(filterSettings, element),

    StartsWithExpr: createComparisonExpression(
        (_elementPropertyValue, _constraint, _filterSettings) => false,
        (elementPropertyValue, constraint) => elementPropertyValue.startsWith(constraint)),

    EndsWithExpr: createComparisonExpression(
        (_elementPropertyValue, _constraint, _filterSettings) => false,
        (elementPropertyValue, constraint) => elementPropertyValue.endsWith(constraint)),

    PropertiesSelectExpr: (_) => (_settings, _element) => true,

    AggregatedSelectionClause: (_) => (_settings, _element) => true,

    AggregatedSelectionWithGroups: (_1, _2, _3) => (_settings, _element) => true,

    FilterWithSelectExpr: (filterNode, _1, _2) => filterNode.compileFilter(),

    FilterWithAggregatedSelectExpr: (filterNode, _1, _2) => filterNode.compileFilter(),

    FilterWithGroupedAggregedSelectExpr: (filterNode, _1, _2, _3, _4) => filterNode.compileFilter()
}

export const compileSelect: FilterActionDict<SelectValueQuery[]> = {
    FilterExpr: (_) => [],

    AggregatedSelectionClause: (_) => [],

    FilterWithAggregatedSelectExpr: (_1, _2, _3) => [],

    FilterWithGroupedAggregedSelectExpr: (_1, _2, _3, _4, groupPropertiesNode) => groupPropertiesNode.compileSelect(),

    FilterWithSelectExpr: (_1, _2, node) => node.compileSelect(),

    AggregatedSelectionWithGroups: (_1, _2, groupPropertiesNode) => groupPropertiesNode.compileSelect(),

    PropertiesExpr: (firstIdentifierNode, _, sequence) => {
        const properties: SelectValueQuery[] = firstIdentifierNode.compileSelect();

        const sequenceValue: SelectValueQuery[] = sequence.children.flatMap(x => x.compileSelect());

        properties.splice(1, 0, ...sequenceValue)

        return properties;
    },

    NamedPropertyExpr: (propertyNode, _, nameNode) => [{ fun: createPropertyValueGetterFunction(propertyNode), name: nameNode.sourceString }],

    propertySequence: (node) => [{ fun: createPropertyValueGetterFunction(node) }]
}

export const compileAggregate: FilterActionDict<AggregatedValueQuery[]> = {
    FilterWithSelectExpr: (_1, _2, _3) => [],

    FilterExpr: (_) => [],

    PropertiesSelectExpr: (_) => [],

    FilterWithAggregatedSelectExpr: (_1, _2, aggregateSelectNode) => aggregateSelectNode.compileAggregate(),

    FilterWithGroupedAggregedSelectExpr: (_1, _2, aggregateSelectNode, _3, _4) => aggregateSelectNode.compileAggregate(),

    AggregatedSelectionWithGroups: (aggregateSelectNode, _1, _2) => aggregateSelectNode.compileAggregate(),

    AggregatedNamedFuncExpr: (aggregatedFuncNode, _, propertyNameIdentifierNode) => {
        const aggregatedPropertries = aggregatedFuncNode.compileAggregate()[0];

        return [{ ...aggregatedPropertries, name: propertyNameIdentifierNode.sourceString }];
    },

    AggregatedFuncsExpr: (firstIdentifierNode, _, sequence) => {
        const aggregatedPropertries: AggregatedValueQuery[] = firstIdentifierNode.compileAggregate();

        const sequencedProperties: AggregatedValueQuery[] = sequence.children.flatMap(x => x.compileAggregate());

        aggregatedPropertries.splice(1, 0, ...sequencedProperties);

        return aggregatedPropertries;
    },

    AggregatedCountExpr: (_1, _2) => [{
        type: "count",
        elemValueFun: (_settings, _element) => 1
    }],

    AggregatedSumExpr: (_1, _2, propertyNode, _3) => [{
        type: "sum",
        elemValueFun: createPropertyValueGetterFunction(propertyNode)
    }],

    AggregatedMinExpr: (_1, _2, propertyNode, _3) => [{
        type: "min",
        elemValueFun: createPropertyValueGetterFunction(propertyNode)
    }],

    AggregatedMaxExpr: (_1, _2, propertyNode, _3) => [{
        type: "max",
        elemValueFun: createPropertyValueGetterFunction(propertyNode)
    }],

    AggregatedAvgExpr: (_1, _2, propertyNode, _3) => [{
        type: "avg",
        elemValueFun: createPropertyValueGetterFunction(propertyNode)
    }]
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

    textValue: (valueNode) => createSimpleValue(valueNode, value => value.replaceAll('\\"', '"')),

    likeTextValue: (valueNode) => createSimpleValue(valueNode, value => value.replaceAll('\\"', '"').replaceAll("\\%", "%"))
}

const createPropertyValueGetterFunction = (node: ohm.NonterminalNode) => {
    const propertyDefinition = convertToPropertiesNode(node) as Property;

    return (settings: QuerySettings, element: IQueryableElement) => {
        if (!compareCategories(element.categoriesList, propertyDefinition.categories))
            return undefined;

        const categoryTemplates = expandTemplateCategoriesForValue(propertyDefinition.categories, element.categoriesList.length);

        return categoryTemplates
            .map(x => element.getPropertyValue(propertyDefinition.propertyName, x))
            .filter(x => x.value !== undefined)
            .map(x => isNumberProperty(x) ? getNumberPropertyValue(x, settings) : x.value)
            .find(x => x);
    }
}