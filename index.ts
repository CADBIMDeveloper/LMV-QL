import { ExpressionComputeResults, QueryResults, Settings, UserComputeOptions, UserQueryOptions } from "./output";
import { IModel } from "./model";
import { engine } from "./engine";

export async function query(model: IModel, query: string, options: Settings): Promise<QueryResults> {
  const propertyDatabase = model.getPropertyDb();

  const code = `function userFunction(pdb, tag) { const engine = ${engine}; return engine().filterElements(pdb, tag); }`;

  return propertyDatabase.executeUserFunction<QueryResults, UserQueryOptions>(code, { lmvQuery: query, lmvQueryOptions: options });
}

export async function computeExpressionValue(model: IModel, dbId: number, query: string, attributesCaseSensitive: boolean = true): Promise<ExpressionComputeResults> {
  const propertyDatabase = model.getPropertyDb();

  const code = `function userFunction(pdb, tag) { const engine = ${engine}; return engine().computeExpression(pdb, tag); }`;

  return propertyDatabase.executeUserFunction<ExpressionComputeResults, UserComputeOptions>(code, { nodeId: dbId, propertyQuery: query, caseSensitive: attributesCaseSensitive });
}