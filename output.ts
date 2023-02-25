import { ParsingError } from "./parsingError";

export type Settings = {
    tolerance: number;
    stringCaseSensitive: boolean;
    leafNodesOnly: boolean;
    attributesCaseSensitive: boolean;
    displayUnits: string;
    displayUnitsPrecision: number | string;
    dbIds: number[];
    modelBrowserExcludeRoot: boolean;
}

export type ComputeSettings = {
    attributesCaseSensitive: boolean;
    displayUnits: string;
    displayUnitsPrecision: number | string;
}

export type QueryResults = {
    dbIds: number[];
    columns: string[];
    rows: QuryResultRow[];
    error: ParsingError | Error | null;
}

export type QuryResultRow = {
    dbIds: number[];
    values: {
        [key: string]: string | number | undefined
    }
}

export type ExpressionComputeResults = {
    result: number | string | undefined;
    error: ParsingError | Error | null;
}

export type UserQueryOptions = {
    lmvQuery: string;
    nodes: number[];
    lmvQueryOptions: Settings;
}