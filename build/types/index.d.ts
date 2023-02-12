import { ExpressionComputeResults, QueryResults, Settings } from "./output";
import { IModel } from "./model";
export declare function query(model: IModel, query: string, options: Settings): Promise<QueryResults>;
export declare function computeExpressionValue(model: IModel, dbId: number, query: string, attributesCaseSensitive?: boolean): Promise<ExpressionComputeResults>;
