import { Settings } from "../../../output";
import { IFilterableElement } from "../../filterableElement";
import { AggregatedValueQuery } from "../../filterOperations";
import { CountFunction } from "./countFunction";
import { SumFunction } from "./sumFunction";

export interface IAggregatedFunction {
    get name(): string;

    get dbIds(): number[];

    push(dbId: number, element: IFilterableElement): void

    compile(): number;
}

export const createAggregatedFunction = (aggregatedValueQuery: Required<AggregatedValueQuery>, settings: Settings): IAggregatedFunction => {
    switch (aggregatedValueQuery.type) {
        case "count":
            return new CountFunction(aggregatedValueQuery.name);

        case "sum":
            return new SumFunction(aggregatedValueQuery, settings);
    
        default:
            throw new Error(`${aggregatedValueQuery.type} is not supported yet`)
    }
}