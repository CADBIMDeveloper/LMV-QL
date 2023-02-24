import { Settings } from "../../output";
import { IFilterableElement } from "../filterableElement";
import { AggreagatedValueQuery, SelectValueQuery } from "../filterOperations";
import { IQueryPropertiesExtractor, QuryResultRow } from "./queryPropertiesExtractorsFactory";

export class AggregatedQueryPropertiesExtractor implements IQueryPropertiesExtractor {
    constructor(groupProperties: SelectValueQuery[], aggregatedProperties: AggreagatedValueQuery[], private readonly settings: Settings) {

    }

    push(dbId: number, element: IFilterableElement): void {
        throw new Error("Method not implemented.");
    }

    compile(): QuryResultRow[] {
        throw new Error("Method not implemented.");
    }
    
    getColumns(): string[] {
        throw new Error("Method not implemented.");
    }
}