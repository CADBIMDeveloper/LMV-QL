import { ComputeSettings, ExpressionComputeResults, QueryResults, Settings } from "./output";
import { IModel } from "./model";
export declare function query(model: IModel, query: string, options?: Partial<Settings>): Promise<QueryResults>;
export declare function computeExpressionValue(model: IModel, dbId: number, queryString: string, options?: Partial<ComputeSettings>): Promise<ExpressionComputeResults>;
