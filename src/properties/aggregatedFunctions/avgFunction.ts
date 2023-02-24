import { Settings } from "../../../output";
import { IFilterableElement } from "../../filterableElement";
import { AggregatedValueQuery } from "../../filterOperations";
import { IAggregatedFunction } from "./aggregatedFunctionsFactory";
import { SumFunction } from "./sumFunction";

export class AvgFunction implements IAggregatedFunction {
    private readonly sumFunction: SumFunction;

    constructor(private readonly aggregatedValueQuery: Required<AggregatedValueQuery>, settings: Settings) {
        this.sumFunction = new SumFunction(aggregatedValueQuery, settings);
    }
    
    public get dbIds(): number[] {
        return this.sumFunction.dbIds;
    }

    public get name(): string {
        return this.aggregatedValueQuery.name;
    }
    
    push(dbId: number, element: IFilterableElement): void {
        this.sumFunction.push(dbId, element);
    }

    compile(): number {
        return this.sumFunction.compile() / this.sumFunction.dbIds.length;
    }
}