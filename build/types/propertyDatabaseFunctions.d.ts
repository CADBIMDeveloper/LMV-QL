import { UserComputeOptions, UserQueryOptions } from "./output";
import { PropertyDatabase } from "./propertyDatabase";
export declare const filterElements: (pdb: PropertyDatabase, tag: UserQueryOptions) => {
    dbIds: number[];
    error: null;
} | {
    dbIds: never[];
    error: any;
};
export declare const computeExpression: (pdb: PropertyDatabase, tag: UserComputeOptions) => {
    result: string | number | undefined;
    error: null;
} | {
    result: undefined;
    error: any;
};
