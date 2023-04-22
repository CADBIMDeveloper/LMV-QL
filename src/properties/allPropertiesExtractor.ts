import { Settings } from "../../output";
import { getNumberPropertyValue, isNumberProperty } from "../numberPropertyValue";
import { IQueryableElement } from "../queryableElement";
import { IQueryPropertiesExtractor, QuryResultRow } from "./queryPropertiesExtractorsFactory";

export class AllPropertiesExtractor implements IQueryPropertiesExtractor {
    private readonly results: QuryResultRow[] = [];
    private readonly columns = new Set<string>();

    constructor(private readonly settings: Settings) {

    }

    push(dbId: number, element: IQueryableElement): void {
        const rowValue: QuryResultRow = {
            dbIds: [dbId],
            values: {}
        }

        const propertyValues = element.getObjectProperties();

        for (const property of propertyValues) {
            if (!property.attribute)
                continue;

            const propertyName = property.attribute.name;

            rowValue.values[propertyName] = isNumberProperty(property) ? getNumberPropertyValue(property, this.settings) : property.value;

            this.columns.add(propertyName);
        }

        this.results.push(rowValue);
    }

    compile(): QuryResultRow[] {
        return this.results;
    }

    getColumns(): string[] {
        return Array.from(this.columns.values());
    }
}