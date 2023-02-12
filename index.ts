import { ExpressionComputeResults, QueryResults, Settings, UserComputeOptions, UserQueryOptions } from "./output";
import { computeExpression, filterElements } from "./propertyDatabaseFunctions";
import { IModel } from "./src/model";

export async function query(model: IModel, query: string, options: Settings): Promise<QueryResults> {
  const propertyDatabase = model.getPropertyDb();

  return propertyDatabase.executeUserFunction<QueryResults, UserQueryOptions>(function userFunction(pdb, tag) {
    return filterElements(pdb, tag!);
  }, { lmvQuery: query, lmvQueryOptions: options });
}

export async function computeExpressionValue(model: IModel, dbId: number, query: string, attributesCaseSensitive: boolean = true): Promise<ExpressionComputeResults> {
  const propertyDatabase = model.getPropertyDb();

  return propertyDatabase.executeUserFunction<ExpressionComputeResults, UserComputeOptions>(function userFunction(pdb, tag) {
    return computeExpression(pdb, tag!)
  }, { nodeId: dbId, propertyQuery: query, caseSensitive: attributesCaseSensitive });
}