import { IFilterableElement } from "../../filterableElement";
import { IAggregatedFunction } from "./aggregatedFunctionsFactory";

export class CountFunction implements IAggregatedFunction {
    private totalCount: number = 0;

    constructor(public readonly name: string) {

    }

    public dbIds: number[] = [];
    
    push(dbId: number, _element: IFilterableElement): void {
        this.dbIds.push(dbId);

        ++this.totalCount;
    }

    compile(): number {
        return this.totalCount;
    }
}