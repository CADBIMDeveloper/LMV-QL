import { UserComputeOptions, UserQueryOptions } from "./output";
import { ElementPropertyValueQueryFactory } from "./src/elementPropertyValueQueryFactory";
import { FilterFactory } from "./src/filterFactory";
import { PropertyDatabase } from "./propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./src/propertyDatabaseAttributesCollection";
import { PropertyDatabaseFilterableElement } from "./src/propertyDatabaseFilterableElement";
import { findRootNodes } from "./src/rootsNodesFactory";
import { PropertyValuesQueryFactory } from "./src/propertyValuesQueryFactory";

export const filterElements = (pdb: PropertyDatabase, tag: UserQueryOptions) => {
    try {
        const dbIds: number[] = [];

        const { lmvQuery, lmvQueryOptions } = tag!;

        const filterFactory = new FilterFactory(lmvQueryOptions);

        const elementFilter = filterFactory.createFilter(lmvQuery);

        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, lmvQueryOptions.attributesCaseSensitive);

        const roots = findRootNodes(pdb, attributesCollection);

        const propertyValuesQueryFactory = new PropertyValuesQueryFactory(pdb, attributesCollection, roots);

        pdb.enumObjects(dbId => {
            if (lmvQueryOptions.leafNodesOnly && pdb.getNodeNameAndChildren({ dbId }) !== undefined)
                return;

            const element = new PropertyDatabaseFilterableElement(dbId, propertyValuesQueryFactory);

            if (elementFilter(element))
                dbIds.push(dbId);
        });

        return {
            dbIds,
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

        const factory = new ElementPropertyValueQueryFactory();

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