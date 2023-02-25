import { Settings } from "../../../output";
import { IQueryableElement } from "../../queryableElement";
import { AggregatedValueQuery } from "../../operations";
import { AvgFunction } from "./avgFunction";
import { CountFunction } from "./countFunction";
import { MaxFunction } from "./maxFunction";
import { MinFunction } from "./minFunction";
import { SumFunction } from "./sumFunction";

export interface IAggregatedFunction {
    get name(): string;

    get dbIds(): number[];

    push(dbId: number, element: IQueryableElement): void

    compile(): number;
}

export const createAggregatedFunction = (aggregatedValueQuery: Required<AggregatedValueQuery>, settings: Settings): IAggregatedFunction => {
    switch (aggregatedValueQuery.type) {
        case "count":
            return new CountFunction(aggregatedValueQuery.name);

        case "sum":
            return new SumFunction(aggregatedValueQuery, settings);

        case "min":
            return new MinFunction(aggregatedValueQuery, settings);

        case "max":
            return new MaxFunction(aggregatedValueQuery, settings);

        case "avg":
            return new AvgFunction(aggregatedValueQuery, settings);
    
        default:
            throw new Error(`${aggregatedValueQuery.type} is not supported yet`)
    }
}