import { ComputeSettings, ExpressionComputeResults, QueryResults, Settings, UserQueryOptions } from "./output";
import { engine } from "./engine";

export async function query(model: Autodesk.Viewing.Model, query: string, options?: Partial<Settings>): Promise<QueryResults> {
  const lmvQueryOptions = createFilterSettings(options);

  const propertyDatabase = model.getPropertyDb();

  const nodes = lmvQueryOptions.dbIds.length === 0 ? getModelNodesForSearch(model) : lmvQueryOptions.dbIds;

  const code = `function userFunction(pdb, tag) { const engine = ${engine}; return engine().filterElements(pdb, tag); }`;

  return propertyDatabase.executeUserFunction<QueryResults, UserQueryOptions>(code, { lmvQuery: query, lmvQueryOptions, nodes });
}

export async function headlessQuery(viewerDocument: Autodesk.Viewing.Document, bubbleNode: Autodesk.Viewing.BubbleNode, queryString: string, options?: Partial<Settings>): Promise<QueryResults> {
  const module = await import("./src/headless/modelBuilder");

  const model = await module.createModel(viewerDocument, bubbleNode);
  
  return query(model, queryString, options);
}

export async function computeExpressionValue(model: Autodesk.Viewing.Model, dbId: number, queryString: string, options?: Partial<ComputeSettings>): Promise<ExpressionComputeResults> {
  console.warn("computeExpressionValue is deprecated, use `query` instead with dbIds provided in options");

  const filterSettings: Partial<Settings> = { ...options, dbIds: [dbId] };

  const results = await query(model, queryString, filterSettings);

  if (results.error)
    return { error: results.error, result: undefined };

  const value = results.rows[0].values[results.columns[0]];

  return { result: value, error: null };
}

const getModelNodesForSearch = (model: Autodesk.Viewing.Model) => {
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