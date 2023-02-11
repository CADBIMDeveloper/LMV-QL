import { FilterFactory } from "./src/filterFactory";
import { FilterSettings } from "./src/filterSettings";
import { IModel } from "./src/model";
import { ParsingError } from "./src/parsingError";
import { PropertyDatabaseAttributesCollection } from "./src/propertyDatabaseAttributesCollection";
import { PropertyDatabaseFilterableElement } from "./src/propertyDatabaseFilterableElement";

export { FilterFactory } from "./src/filterFactory"

export function helloWorld() {
  const message = 'Hello World!';
  return message;
}

export type Settings = FilterSettings & { leafNodesOnly: boolean; attributesCaseSensitive: boolean }

export type QueryResults = {
  dbIds: number[];
  error: ParsingError | Error | null;
}

type UserFunctionOptions = {
  lmvQuery: string;
  lmvQueryOptions: Settings;
}

export async function query(model: IModel, query: string, options: Settings) {
  const propertyDatabase = model.getPropertyDb();

  return propertyDatabase.executeUserFunction<QueryResults, UserFunctionOptions>(function (pdb, tag) {
    try {
      const dbIds: number[] = [];

      const { lmvQuery, lmvQueryOptions } = tag!;

      const filterFactory = new FilterFactory(lmvQueryOptions);

      const elementFilter = filterFactory.createFilter(lmvQuery);

      const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, lmvQueryOptions.attributesCaseSensitive);

      pdb.enumObjects(dbId => {
        if (lmvQueryOptions.leafNodesOnly && pdb.getNodeNameAndChildren({dbId}) !== undefined)
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