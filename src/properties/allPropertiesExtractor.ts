import { Settings } from "../../output";
import { IQueryableElement } from "../queryableElement";
import { IQueryPropertiesExtractor, QuryResultRow } from "./queryPropertiesExtractorsFactory";

export class AllPropertiesExtractor implements IQueryPropertiesExtractor {
    constructor(private readonly settings: Settings) {
        
    }

    push(dbId: number, element: IQueryableElement): void {
        throw new Error("Method not implemented.");
    }
    
    compile(): QuryResultRow[] {
        throw new Error("Method not implemented.");
    }
    
    getColumns(): string[] {
        throw new Error("Method not implemented.");
    }
}