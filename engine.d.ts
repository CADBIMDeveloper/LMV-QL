import { ExpressionComputeResults, QueryResults, UserComputeOptions, UserQueryOptions } from "./output";
import { PropertyDatabase } from "./propertyDatabase";

export function engine(): {
    filterElements: (pdb: PropertyDatabase, tag: UserQueryOptions) => QueryResults;
    
    computeExpression: (pdb: PropertyDatabase, tag: UserComputeOptions) => ExpressionComputeResults;
};