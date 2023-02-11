import { FilterFactory } from "./src/filterFactory";
import { FilterSettings } from "./src/filterSettings";
import { IModel } from "./src/model";
import { ParsingError } from "./src/parsingError";

export { FilterFactory } from "./src/filterFactory"

export function helloWorld() {
  const message = 'Hello World!';
  return message;
}

export type Settings = FilterSettings & { leafNodesOnly: boolean; }

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
      const { lmvQuery, lmvQueryOptions } = tag!;

      const filterFactory = new FilterFactory(lmvQueryOptions);

      const elementFilter = filterFactory.createFilter(lmvQuery);
      
      return {
        dbIds: [],
        error: new Error("This feature is under development")
      }
    } catch (error: any) {
      return {
        dbIds: [],
        error: error
      }
    }

  }, { lmvQuery: query, lmvQueryOptions: options });
}