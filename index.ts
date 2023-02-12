import { ElementPropertyValueQueryFactory } from "./src/elementPropertyValueQueryFactory";
import { FilterFactory } from "./src/filterFactory";
import { FilterSettings } from "./src/filterSettings";
import { IModel } from "./src/model";
import { ParsingError } from "./src/parsingError";
import { PropertyDatabaseAttributesCollection } from "./src/propertyDatabaseAttributesCollection";
import { PropertyDatabaseFilterableElement } from "./src/propertyDatabaseFilterableElement";

export type Settings = FilterSettings & { leafNodesOnly: boolean; attributesCaseSensitive: boolean }

export type QueryResults = {
  dbIds: number[];
  error: ParsingError | Error | null;
}

export type ExpressionComputeResults = {
  result: number | string | undefined;
  error: ParsingError | Error | null;
}

type UserQueryOptions = {
  lmvQuery: string;
  lmvQueryOptions: Settings;
}

type UserComputeOptions = {
  nodeId: number;
  propertyQuery: string;
  caseSensitive: boolean;
}

export async function query(model: IModel, query: string, options: Settings): Promise<QueryResults> {
  const propertyDatabase = model.getPropertyDb();

  return propertyDatabase.executeUserFunction<QueryResults, UserQueryOptions>(function userFunction(pdb, tag) {
    try {
      const dbIds: number[] = [];

      const { lmvQuery, lmvQueryOptions } = tag!;

      const filterFactory = new FilterFactory(lmvQueryOptions);

      const elementFilter = filterFactory.createFilter(lmvQuery);

      const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, lmvQueryOptions.attributesCaseSensitive);

      pdb.enumObjects(dbId => {
        if (lmvQueryOptions.leafNodesOnly && pdb.getNodeNameAndChildren({ dbId }) !== undefined)
          return;

        const element = new PropertyDatabaseFilterableElement(dbId, pdb, attributesCollection);

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

  }, { lmvQuery: query, lmvQueryOptions: options });
}

export async function computeExpressionValue(model: IModel, dbId: number, query: string, attributesCaseSensitive: boolean = true): Promise<ExpressionComputeResults> {
  const propertyDatabase = model.getPropertyDb();

  return propertyDatabase.executeUserFunction<ExpressionComputeResults, UserComputeOptions>(function userFunction(pdb, tag) {
    try {
      const { nodeId, propertyQuery, caseSensitive } = tag!;

      const factory = new ElementPropertyValueQueryFactory();

      const query = factory.createPropertyQuery(propertyQuery);

      const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, caseSensitive);

      const element = new PropertyDatabaseFilterableElement(nodeId, pdb, attributesCollection);

      const result = query(element);

      return { result, error: null };
    } catch (error: any) {
      return {
        result: undefined,
        error
      }
    }
  }, { nodeId: dbId, propertyQuery: query, caseSensitive: attributesCaseSensitive });
}