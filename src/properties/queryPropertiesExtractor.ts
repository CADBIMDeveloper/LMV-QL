import { Settings } from "../../output";
import { IFilterableElement } from "../filterableElement";
import { SelectValueQuery } from "../filterOperations";
import { IQueryPropertiesExtractor, QuryResultRow } from "./queryPropertiesExtractorsFactory";

export class QueryPropertiesExtractor implements IQueryPropertiesExtractor {
    private readonly properties: SelectValueQuery[];
    private readonly results: QuryResultRow[] = [];

    constructor(properties: SelectValueQuery[], private readonly settings: Settings) {
        this.properties = properties.map((x, i) => { return { ...x, name: x.name || `$col_${i + 1}` }; })
    }

    push(dbId: number, element: IFilterableElement): void {
        const rowValue: QuryResultRow = {
            dbIds: [dbId],
            values: {}
        }

        for (const property of this.properties)
            rowValue.values[property.name!] = property.fun(this.settings, element);

        this.results.push(rowValue);
    }

    compile(): QuryResultRow[] {
        return this.results;
    }

    getColumns(): string[] {
        return this.properties.map(x => x.name!);
    }
}