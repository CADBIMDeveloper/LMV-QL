import * as ohm from "ohm-js";
import { compareCategories } from "./elementCategoriesComparer";
import { expandTemplateCategoriesForValue } from "./expandedWildcategoriesFactory";
import { IQueryableElement } from "./queryableElement";
import { FilterActionDict } from "./grammar.ohm-bundle";
import { QuerySettings } from "./querySettings";
import { getNumberPropertyValue, isNumberProperty } from "./numberPropertyValue";
import { isAlmostEqual, isAlmostEqualOrLessThan, isAlmostEqualOrMoreThan, isLessThan, isMoreThan } from "./numbersComparison";

export type Filter = (settings: QuerySettings, element: IQueryableElement) => boolean;

export type ElementFilter = (element: IQueryableElement) => boolean;

export type ElementQuery = {
    filter: ElementFilter;
    selectProperties: SelectValueQuery[];
    aggregateProperties: AggregatedValueQuery[];
    selectAll: boolean;
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
    value: (string | number)[];
}

export type PropertyDefinition = Category | Property | SimpleValue | SimpleNumberValue | ArrayValue;

const isNumberValueDefinition = (propertyDefinition: PropertyDefinition): propertyDefinition is SimpleNumberValue => {
    return propertyDefinition.type === "number";
}

const isPropertyValueDefinition = (value: PropertyDefinition): value is Property => value.type === "property-value";
const isValueDefinition = (value: PropertyDefinition): value is SimpleValue | SimpleNumberValue => value.type === "simple" || value.type === "number";

const isString = (value: number | string | undefined): value is string => typeof value === "string";

type ComparisonExpression = (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode) => Filter;

type DefinedComparisonExpression = (propertyDefinition: Property, valueDefinition: (SimpleValue | SimpleNumberValue)) => Filter;

type PropertiesComparisonExpression = (firstPropertyDefinition: Property, secondPropertyDefinition: Property) => Filter;

const createDefinedComparisonExpression = (
    numberComparisonRule: (elementPropertyValue: number, constraint: number, filterSettings: QuerySettings) => boolean,
    textComparisonRule: (elementPropertyValue: string, constraint: string) => boolean): DefinedComparisonExpression => {
    return (propertyDefinition: Property, valueDefinition: (SimpleValue | SimpleNumberValue)) => {
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

const createPropertiesComparisonExpression = (
    numberComparisonRule: (elementPropertyValue: number, constraint: number, filterSettings: QuerySettings) => boolean,
    textComparisonRule: (elementPropertyValue: string, constraint: string) => boolean): PropertiesComparisonExpression => {
    return (firstPropertyDefinition, secondPropertyDefinition) => {
        return (filterSettings, element) => {
            if (!(compareCategories(element.categoriesList, firstPropertyDefinition.categories)
                && compareCategories(element.categoriesList, secondPropertyDefinition.categories)))
                return false;

            const firstPropertyValues = expandTemplateCategoriesForValue(firstPropertyDefinition.categories, element.categoriesList.length)
                .map(x => element.getPropertyValue(firstPropertyDefinition.propertyName, x));

            const secondPropertyValues = expandTemplateCategoriesForValue(secondPropertyDefinition.categories, element.categoriesList.length)
                .map(x => element.getPropertyValue(secondPropertyDefinition.propertyName, x));


            for (const firstPropertyValue of firstPropertyValues)
                for (const secondPropertyValue of secondPropertyValues) {
                    if (isNumberProperty(firstPropertyValue) && isNumberProperty(secondPropertyValue)) {
                        const firstNumberValue = getNumberPropertyValue(firstPropertyValue, filterSettings);
                        const secondNumberValue = getNumberPropertyValue(secondPropertyValue, filterSettings);

                        if (numberComparisonRule(firstNumberValue, secondNumberValue, filterSettings))
                            return true;
                    }

                    if (isString(firstPropertyValue.value) && isString(secondPropertyValue.value)) {
                        const firstStringValue = filterSettings.stringCaseSensitive
                            ? firstPropertyValue.value
                            : firstPropertyValue.value.toLocaleLowerCase();

                        const secondStringValue = filterSettings.stringCaseSensitive
                            ? secondPropertyValue.value
                            : secondPropertyValue.value.toLocaleLowerCase();

                        if (textComparisonRule(firstStringValue, secondStringValue))
                            return true;
                    }
                }

            return false;
        }
    }
}

const createComparisonExpression = (
    numberComparisonRule: (elementPropertyValue: number, constraint: number, filterSettings: QuerySettings) => boolean,
    textComparisonRule: (elementPropertyValue: string, constraint: string) => boolean): ComparisonExpression => {

    return (leftNode: ohm.NonterminalNode, _: ohm.TerminalNode, rightNode: ohm.NonterminalNode) => {
        const leftNodeDefinion = leftNode.getPropertyDefinition();
        const rightNodeDefinition = rightNode.getPropertyDefinition();

        // at least one of nodes is a property definition according to OHM grammar
        const propertyDefinition = [leftNodeDefinion, rightNodeDefinition].find(x => isPropertyValueDefinition(x)) as Property;
        const valueDefinition = [leftNodeDefinion, rightNodeDefinition].find(x => isValueDefinition(x)) as SimpleValue | SimpleNumberValue | undefined;

        if (valueDefinition !== undefined) {
            const definedComparisonExpression = createDefinedComparisonExpression(numberComparisonRule, textComparisonRule);

            return definedComparisonExpression(propertyDefinition, valueDefinition);
        }

        const otherPropertyDefinion: Property = propertyDefinition === leftNodeDefinion ? rightNodeDefinition : leftNodeDefinion;

        const propertiesComparisonExpression = createPropertiesComparisonExpression(numberComparisonRule, textComparisonRule);

        return propertiesComparisonExpression(propertyDefinition, otherPropertyDefinion);
    }
}

const equalityExpression = createComparisonExpression(
    (elementPropertyValue, constraint, filterSettings) => isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance),
    (elementPropertyValue, constraint) => elementPropertyValue === constraint);

const lessThanExpression = createComparisonExpression(
    (elementPropertyValue, constraint, filterSettings) => isLessThan(elementPropertyValue, constraint, filterSettings.tolerance),
    (elementPropertyValue, constraint) => elementPropertyValue < constraint);

const lessThanOrEqualExpression = createComparisonExpression(
    (elementPropertyValue, constraint, filterSettings) => isAlmostEqualOrLessThan(elementPropertyValue, constraint, filterSettings.tolerance),
    (elementPropertyValue, constraint) => elementPropertyValue <= constraint);

const moreThanExpression = createComparisonExpression(
    (elementPropertyValue, constraint, filterSettings) => isMoreThan(elementPropertyValue, constraint, filterSettings.tolerance),
    (elementPropertyValue, constraint) => elementPropertyValue > constraint);

const moreThanOrEqualExpression = createComparisonExpression(
    (elementPropertyValue, constraint, filterSettings) => isAlmostEqualOrMoreThan(elementPropertyValue, constraint, filterSettings.tolerance),
    (elementPropertyValue, constraint) => elementPropertyValue >= constraint);

const nonEqualityExpression = (propertyNode: ohm.NonterminalNode, _: ohm.TerminalNode, valueNode: ohm.NonterminalNode): Filter => {
    const equalityExpression = createComparisonExpression(
        (elementPropertyValue, constraint, filterSettings) => isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance),
        (elementPropertyValue, constraint) => elementPropertyValue === constraint)

    const equalityCheck = equalityExpression(propertyNode, _, valueNode);

    return (settings, element) => !equalityCheck(settings, element);
}

export const compileFilter: FilterActionDict<Filter> = {
    exactElement: (node) => {
        const propertyDefinition: Category = node.getPropertyDefinition();

        return (_, element) => compareCategories(element.categoriesList, propertyDefinition.categories);
    },

    EqualityExpr: equalityExpression,

    PropertiesEqualityExpr: equalityExpression,

    LessThanExpr: lessThanExpression,

    PropertiesLessThanExpr: lessThanExpression,

    LessThanOrEqualExpr: lessThanOrEqualExpression,

    PropertiesLessThanOrEqualExpr: lessThanOrEqualExpression,

    MoreThanExpr: moreThanExpression,

    PropertiesMoreThanExpr: moreThanExpression,

    MoreThanOrEqualExpr: moreThanOrEqualExpression,

    PropertiesMoreThanOrEqualExpr: moreThanOrEqualExpression,

    BoolAnd_and: (leftNode, _, rightNode) => (filterSettings, element) =>
        leftNode.compileFilter()(filterSettings, element) && rightNode.compileFilter()(filterSettings, element),

    BoolOr_or: (leftNode, _, rightNode) => (filterSettings, element) =>
        leftNode.compileFilter()(filterSettings, element) || rightNode.compileFilter()(filterSettings, element),

    PriExp_paren: (_1, node, _2) => (filterSettings, element) => node.compileFilter()(filterSettings, element),

    NonEqualityExpr: nonEqualityExpression,

    PropertiesNonEqualityExpr: nonEqualityExpression,

    NotExpr: (_1, _2, filterExpr, _3) => (filterSettings, element) => !filterExpr.compileFilter()(filterSettings, element),

    InExpr: (propertyNode, _1, _2, constantsListNode, _3) => {
        const propertyDefinition: Property = propertyNode.getPropertyDefinition();

        const valuesDefinition: ArrayValue = constantsListNode.getPropertyDefinition();

        const valueComparionExpression = createDefinedComparisonExpression(
            (elementPropertyValue, constraint, filterSettings) => isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance),
            (elementPropertyValue, constraint) => elementPropertyValue === constraint);

        const filters = valuesDefinition
            .value
            .map(x => {
                return typeof (x) === "number"
                    ? { type: "number", value: x } satisfies SimpleNumberValue
                    : { type: "simple", value: x } satisfies SimpleValue
            })
            .map(x => valueComparionExpression(propertyDefinition, x));

        return (filterSettings, element) => filters.reduce((acc, elem) => acc || elem(filterSettings, element), false);
    },

    NotInExpr: (propertyNode, _1, _2, _3, constantsListNode, _4) => {
        const propertyDefinition: Property = propertyNode.getPropertyDefinition();

        const valuesDefinition: ArrayValue = constantsListNode.getPropertyDefinition();

        const valueComparionExpression = createDefinedComparisonExpression(
            (elementPropertyValue, constraint, filterSettings) => isAlmostEqual(elementPropertyValue, constraint, filterSettings.tolerance),
            (elementPropertyValue, constraint) => elementPropertyValue === constraint);

        const filters = valuesDefinition
            .value
            .map(x => {
                return typeof (x) === "number"
                    ? { type: "number", value: x } satisfies SimpleNumberValue
                    : { type: "simple", value: x } satisfies SimpleValue
            })
            .map(x => valueComparionExpression(propertyDefinition, x));

        return (filterSettings, element) => filters.reduce((acc, elem) => acc && !elem(filterSettings, element), true);
    },

    StartsWithExpr: createComparisonExpression(
        (_elementPropertyValue, _constraint, _filterSettings) => false,
        (elementPropertyValue, constraint) => elementPropertyValue.startsWith(constraint)),

    EndsWithExpr: createComparisonExpression(
        (_elementPropertyValue, _constraint, _filterSettings) => false,
        (elementPropertyValue, constraint) => elementPropertyValue.endsWith(constraint)),

    PropertiesSelectExpr: (_) => (_settings, _element) => true,

    AggregatedSelectionClause: (_) => (_settings, _element) => true,

    AggregatedSelectionWithGroups: (_1, _2, _3) => (_settings, _element) => true,

    SelectAllExpr: (_) => (_settings, _element) => true,

    FilterWithSelectExpr: (filterNode, _1, _2) => filterNode.compileFilter(),

    FilterWithAggregatedSelectExpr: (filterNode, _1, _2) => filterNode.compileFilter(),

    FilterWithGroupedAggregedSelectExpr: (filterNode, _1, _2, _3, _4) => filterNode.compileFilter(),

    FilterWithSelectAllExpr: (filterNode, _1, _2) => filterNode.compileFilter()
}

export const compileSelect: FilterActionDict<SelectValueQuery[]> = {
    FilterExpr: (_) => [],

    AggregatedSelectionClause: (_) => [],

    FilterWithAggregatedSelectExpr: (_1, _2, _3) => [],

    SelectAllExpr: (_) => [],

    FilterWithSelectAllExpr: (_1, _2, _3) => [],

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

export const compileSelectAll: FilterActionDict<boolean> = {
    SelectAllExpr: (_) => true,

    FilterWithSelectAllExpr: (_1, _2, _3) => true,

    FilterWithSelectExpr: (_1, _2, _3) => false,

    FilterWithGroupedAggregedSelectExpr: (_1, _2, _3, _4, _5) => false,

    FilterWithAggregatedSelectExpr: (_1, _2, _3) => false,

    AggregatedSelectionWithGroups: (_1, _2, _3) => false,

    AggregatedSelectionClause: (_) => false,

    FilterExpr: (_) => false,

    PropertiesSelectExpr: (_) => false
}

export const compileAggregate: FilterActionDict<AggregatedValueQuery[]> = {
    FilterWithSelectExpr: (_1, _2, _3) => [],

    FilterExpr: (_) => [],

    PropertiesSelectExpr: (_) => [],

    SelectAllExpr: (_) => [],

    FilterWithSelectAllExpr: (_1, _2, _3) => [],

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
    ConstantsListExpr: (firstConstNode, _, sequence) => {
        const firstValue: number | string = firstConstNode.getPropertyDefinition().value;

        const value: (number | string)[] = sequence.children.map(x => x.getPropertyDefinition().value);

        value.push(firstValue);

        return { type: "array", value };
    },

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