import { UserQueryOptions } from "./output";
import { QueryFactory } from "./src/queryFactory";
import { PropertyDatabase } from "./propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./src/propertyDatabaseAttributesCollection";
import { PropertyDatabaseQueryableElement } from "./src/propertyDatabaseQueryableElement";
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

        const propertyValuesQueryFactory = new PropertyValuesQueryFactory(pdb, attributesCollection, roots, lmvQueryOptions.modelBrowserExcludeRoot);

        const propertiesExtractor = createPropertiesExtractor(elementQuery, lmvQueryOptions);

        for (const dbId of nodes) {
            if (lmvQueryOptions.leafNodesOnly && pdb.getNodeNameAndChildren({ dbId }) !== undefined)
                continue;

            const element = new PropertyDatabaseQueryableElement(dbId, propertyValuesQueryFactory);

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
            error: error,
            rows: [],
            columns: []
        }
    }
}