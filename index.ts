import { ComputeSettings, ExpressionComputeResults, QueryResults, Settings, UserComputeOptions, UserQueryOptions } from "./output";
import { IModel } from "./model";
import { engine } from "./engine";

export async function query(model: IModel, query: string, options?: Partial<Settings>): Promise<QueryResults> {
  const lmvQueryOptions = createFilterSettings(options);

  const propertyDatabase = model.getPropertyDb();

  const code = `function userFunction(pdb, tag) { const engine = ${engine}; return engine().filterElements(pdb, tag); }`;

  return propertyDatabase.executeUserFunction<QueryResults, UserQueryOptions>(code, { lmvQuery: query, lmvQueryOptions });
}

export async function computeExpressionValue(model: IModel, dbId: number, query: string, options?: Partial<ComputeSettings>): Promise<ExpressionComputeResults> {
  const propertyDatabase = model.getPropertyDb();

  const code = `function userFunction(pdb, tag) { const engine = ${engine}; return engine().computeExpression(pdb, tag); }`;

  const computeOptions = createComputeExpressionOptions(options);

  return propertyDatabase.executeUserFunction<ExpressionComputeResults, UserComputeOptions>(code, {
    nodeId: dbId,
    propertyQuery: query,
    options: computeOptions
  });
}

const createFilterSettings = (options?: Partial<Settings>): Settings => {
  const defaultSettings: Settings = {
    tolerance: 1e-3,
    stringCaseSensitive: true,
    leafNodesOnly: true,
    attributesCaseSensitive: true,
    displayUnits: "",
    displayUnitsPrecision: ""
  }

  if (!options)
    return defaultSettings;

  return {
    tolerance: options.tolerance !== undefined ? options.tolerance : defaultSettings.tolerance,
    stringCaseSensitive: options.stringCaseSensitive !== undefined ? options.stringCaseSensitive : defaultSettings.stringCaseSensitive,
    leafNodesOnly: options.leafNodesOnly !== undefined ? options.leafNodesOnly : defaultSettings.leafNodesOnly,
    attributesCaseSensitive: options.attributesCaseSensitive !== undefined ? options.attributesCaseSensitive : defaultSettings.attributesCaseSensitive,
    displayUnits: options.displayUnits !== undefined ? options.displayUnits : defaultSettings.displayUnits,
    displayUnitsPrecision: options.displayUnitsPrecision !== undefined ? options.displayUnitsPrecision : defaultSettings.displayUnitsPrecision
  }
}

const createComputeExpressionOptions = (options?: Partial<ComputeSettings>): ComputeSettings => {
  const defaultSettings: ComputeSettings = {
    attributesCaseSensitive: true,
    displayUnits: "",
    displayUnitsPrecision: ""
  };

  if (!options)
    return defaultSettings;

  return {
    attributesCaseSensitive: options.attributesCaseSensitive !== undefined ? options.attributesCaseSensitive : defaultSettings.attributesCaseSensitive,
    displayUnits: options.displayUnits !== undefined ? options.displayUnits : defaultSettings.displayUnits,
    displayUnitsPrecision: options.displayUnitsPrecision !== undefined ? options.displayUnitsPrecision : defaultSettings.displayUnitsPrecision
  }
}