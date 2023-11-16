import { ComputeSettings, ExpressionComputeResults, QueryResults, Settings, UserQueryOptions } from "./output";
import { IModel, IPropertyDatabase } from "./model";
import { engine } from "./engine";

export async function query(model: IModel, query: string, options?: Partial<Settings>): Promise<QueryResults> {
  const lmvQueryOptions = createFilterSettings(options);

  const propertyDatabase = model.getPropertyDb();

  const nodes = lmvQueryOptions.dbIds.length === 0 ? getModelNodesForSearch(model) : lmvQueryOptions.dbIds;

  return await queryPropertyDatabase(propertyDatabase, query, nodes, lmvQueryOptions);
}

export async function computeExpressionValue(model: IModel, dbId: number, queryString: string, options?: Partial<ComputeSettings>): Promise<ExpressionComputeResults> {
  console.warn("computeExpressionValue is deprecated, use `query` instead with dbIds provided in options");

  const filterSettings: Partial<Settings> = { ...options, dbIds: [dbId] };

  const results = await query(model, queryString, filterSettings);

  if (results.error)
    return { error: results.error, result: undefined };

  const value = results.rows[0].values[results.columns[0]];

  return { result: value, error: null };
}

async function queryPropertyDatabase(propertyDatabase: IPropertyDatabase, query: string, nodes: number[], lmvQueryOptions: Settings): Promise<QueryResults> {
  const code = `function userFunction(pdb, tag) { const engine = ${engine}; return engine().filterElements(pdb, tag); }`;

  return propertyDatabase.executeUserFunction<QueryResults, UserQueryOptions>(code, { lmvQuery: query, lmvQueryOptions, nodes });
}

const getModelNodesForSearch = (model: IModel) => {
  const nodes: number[] = [];

  const instanceTree = model.getInstanceTree();

  instanceTree.enumNodeChildren(instanceTree.getRootId(), dbId => { nodes.push(dbId) }, true);

  return nodes;
}

const createFilterSettings = (options?: Partial<Settings>): Settings => {
  const defaultSettings: Settings = {
    tolerance: 1e-3,
    stringCaseSensitive: true,
    leafNodesOnly: true,
    attributesCaseSensitive: true,
    displayUnits: "",
    displayUnitsPrecision: "",
    dbIds: [],
    modelBrowserExcludeRoot: true,
    modelName: "Model"
  }

  if (!options)
    return defaultSettings;

  return {
    tolerance: options.tolerance !== undefined ? options.tolerance : defaultSettings.tolerance,
    stringCaseSensitive: options.stringCaseSensitive !== undefined ? options.stringCaseSensitive : defaultSettings.stringCaseSensitive,
    leafNodesOnly: options.leafNodesOnly !== undefined ? options.leafNodesOnly : defaultSettings.leafNodesOnly,
    attributesCaseSensitive: options.attributesCaseSensitive !== undefined ? options.attributesCaseSensitive : defaultSettings.attributesCaseSensitive,
    displayUnits: options.displayUnits !== undefined ? options.displayUnits : defaultSettings.displayUnits,
    displayUnitsPrecision: options.displayUnitsPrecision !== undefined ? options.displayUnitsPrecision : defaultSettings.displayUnitsPrecision,
    dbIds: options.dbIds !== undefined ? options.dbIds : defaultSettings.dbIds,
    modelBrowserExcludeRoot: options.modelBrowserExcludeRoot !== undefined ? options.modelBrowserExcludeRoot : defaultSettings.modelBrowserExcludeRoot,
    modelName: options.modelName !== undefined ? options.modelName : defaultSettings.modelName
  }
}