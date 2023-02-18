import { ParsingError } from "./parsingError";
export type Settings = {
    tolerance: number;
    stringCaseSensitive: boolean;
    leafNodesOnly: boolean;
    attributesCaseSensitive: boolean;
    displayUnits: string;
    displayUnitsPrecision: number | string;
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
