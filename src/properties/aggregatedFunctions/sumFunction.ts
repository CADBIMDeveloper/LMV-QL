import { Settings } from "../../../output";
import { IQueryableElement } from "../../queryableElement";
import { AggregatedValueQuery } from "../../operations";
import { IAggregatedFunction } from "./aggregatedFunctionsFactory";

export class SumFunction implements IAggregatedFunction {
    private totalSum: number = 0;

    constructor(private readonly aggregatedValueQuery: Required<AggregatedValueQuery>, private readonly settings: Settings) {
        
    }
    
    public readonly dbIds: number[] = [];

    public get name(): string {
        return this.aggregatedValueQuery.name;
    }
    
    push(dbId: number, element: IQueryableElement): void {
        const value = this.aggregatedValueQuery.elemValueFun(this.settings, element);

        if (typeof value !== "number")
            return;

        this.dbIds.push(dbId);

        this.totalSum += value;
    }

    compile(): number {
        return this.totalSum;
    }
}