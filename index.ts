import { ExpressionComputeResults, QueryResults, Settings, UserComputeOptions, UserQueryOptions } from "./output";
import { IModel } from "./model";
import { engine } from "./engine";

export async function query(model: IModel, query: string, options: Settings): Promise<QueryResults> {
  const propertyDatabase = model.getPropertyDb();

  const engineModule = engine.toString();

  type Options = UserQueryOptions & { engineModule: string }

  return propertyDatabase.executeUserFunction<QueryResults, Options>(function userFunction(pdb, tag) {
    const engine = eval(tag!.engineModule)();

    return engine.filterElements(pdb, tag);
  }, { lmvQuery: query, lmvQueryOptions: options, engineModule });
}

export async function computeExpressionValue(model: IModel, dbId: number, query: string, attributesCaseSensitive: boolean = true): Promise<ExpressionComputeResults> {
  const propertyDatabase = model.getPropertyDb();

  const engineModule = engine.toString();

  type Options = UserComputeOptions & { engineModule: string }

  return propertyDatabase.executeUserFunction<ExpressionComputeResults, Options>(function userFunction(pdb, tag) {
    const engine = eval(tag!.engineModule)();

    return engine.computeExpression(pdb, tag);
  }, { nodeId: dbId, propertyQuery: query, caseSensitive: attributesCaseSensitive, engineModule });
}