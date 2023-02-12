import { FilterSettings } from "./src/filterSettings";
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
export type UserQueryOptions = {
    lmvQuery: string;
    lmvQueryOptions: Settings;
};
export type UserComputeOptions = {
    nodeId: number;
    propertyQuery: string;
    caseSensitive: boolean;
};
