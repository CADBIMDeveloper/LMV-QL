import { FilterSettings } from "./src/filterSettings";
import { IModel } from "./src/model";
import { ParsingError } from "./src/parsingError";
export type Settings = FilterSettings & {
    leafNodesOnly: boolean;
    attributesCaseSensitive: boolean;
};
export type QueryResults = {
    dbIds: number[];
    error: ParsingError | Error | null;
};
export type ExpressionComputeResults = {
    result: number | string | undefined;
    error: ParsingError | Error | null;
};
export declare function query(model: IModel, query: string, options: Settings): Promise<QueryResults>;
export declare function computeExpressionValue(model: IModel, dbId: number, query: string, attributesCaseSensitive?: boolean): Promise<ExpressionComputeResults>;
