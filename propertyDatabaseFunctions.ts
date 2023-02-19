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

        const { lmvQuery, lmvQueryOptions, nodes } = tag!;

        const filterFactory = new FilterFactory(lmvQueryOptions);

        const elementFilter = filterFactory.createFilter(lmvQuery);

        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, lmvQueryOptions.attributesCaseSensitive);

        const roots = findRootNodes(pdb, attributesCollection);

        const propertyValuesQueryFactory = new PropertyValuesQueryFactory(pdb, attributesCollection, roots);

        let elementConstructionTime = 0;
        let elementFilteringTime = 0;
        let filterAttemptsCount = 0;

        for (const dbId of nodes) {
            if (lmvQueryOptions.leafNodesOnly && pdb.getNodeNameAndChildren({ dbId }) !== undefined)
                continue;

            const constructorStarted = performance.now();

            const element = new PropertyDatabaseFilterableElement(dbId, propertyValuesQueryFactory);

            const constructionTime = performance.now() - constructorStarted;

            const filteringStarted = performance.now();

            if (elementFilter(element))
                dbIds.push(dbId);

            const filteringTime = performance.now() - filteringStarted;

            elementConstructionTime += constructionTime;
            elementFilteringTime += filteringTime;
            ++filterAttemptsCount;
        }

        console.log("statistics", { elementConstructionTime, elementFilteringTime, filterAttemptsCount });

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