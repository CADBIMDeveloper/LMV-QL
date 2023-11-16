import { ComputeSettings, ExpressionComputeResults, QueryResults, Settings } from "./output";
export declare function query(model: Autodesk.Viewing.Model, query: string, options?: Partial<Settings>): Promise<QueryResults>;
export declare function headlessQuery(viewerDocument: Autodesk.Viewing.Document, bubbleNode: Autodesk.Viewing.BubbleNode, queryString: string, options?: Partial<Settings>): Promise<QueryResults>;
export declare function computeExpressionValue(model: Autodesk.Viewing.Model, dbId: number, queryString: string, options?: Partial<ComputeSettings>): Promise<ExpressionComputeResults>;
