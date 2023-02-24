import { UserComputeOptions, UserQueryOptions } from "./output";
import { ElementPropertyValueQueryFactory } from "./src/elementPropertyValueQueryFactory";
import { QueryFactory } from "./src/queryFactory";
import { PropertyDatabase } from "./propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./src/propertyDatabaseAttributesCollection";
import { PropertyDatabaseFilterableElement } from "./src/propertyDatabaseFilterableElement";
import { findRootNodes } from "./src/rootsNodesFactory";
import { PropertyValuesQueryFactory } from "./src/propertyValuesQueryFactory";
import { createPropertiesExtractor } from "./src/properties/queryPropertiesExtractorsFactory";

export const filterElements = (pdb: PropertyDatabase, tag: UserQueryOptions) => {
    try {
        const dbIds: number[] = [];

        const { lmvQuery, lmvQueryOptions, nodes } = tag!;

        const filterFactory = new QueryFactory(lmvQueryOptions);

        const elementQuery = filterFactory.createQuery(lmvQuery);

        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, lmvQueryOptions.attributesCaseSensitive);

        const roots = findRootNodes(pdb, attributesCollection);

        const propertyValuesQueryFactory = new PropertyValuesQueryFactory(pdb, attributesCollection, roots);

        const propertiesExtractor = createPropertiesExtractor(elementQuery, lmvQueryOptions);

        for (const dbId of nodes) {
            if (lmvQueryOptions.leafNodesOnly && pdb.getNodeNameAndChildren({ dbId }) !== undefined)
                continue;

            const element = new PropertyDatabaseFilterableElement(dbId, propertyValuesQueryFactory);

            if (elementQuery.filter(element)) {
                dbIds.push(dbId);

                propertiesExtractor.push(dbId, element);
            }
        }

        return {
            dbIds,
            rows: propertiesExtractor.compile(),
            columns: propertiesExtractor.getColumns(),
            error: null
        }
    } catch (error: any) {
        return {
            dbIds: [],
            error: error
        }
    }
}

export const computeExpression = (pdb: PropertyDatabase, tag: UserComputeOptions) => {
    try {
        const { nodeId, propertyQuery, options } = tag!;

        const factory = new ElementPropertyValueQueryFactory(options);

        const query = factory.createPropertyQuery(propertyQuery);

        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, options.attributesCaseSensitive);

        const roots = findRootNodes(pdb, attributesCollection);

        const propertyValuesQueryFactory = new PropertyValuesQueryFactory(pdb, attributesCollection, roots);

        const element = new PropertyDatabaseFilterableElement(nodeId, propertyValuesQueryFactory);

        const result = query(element);

        return { result, error: null };
    } catch (error: any) {
        return {
            result: undefined,
            error
        }
    }
}