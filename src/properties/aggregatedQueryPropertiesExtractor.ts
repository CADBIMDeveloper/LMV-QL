import { Settings } from "../../output";
import { IQueryableElement } from "../queryableElement";
import { AggregatedValueQuery, SelectValueQuery } from "../operations";
import { createAggregatedFunction, IAggregatedFunction } from "./aggregatedFunctions/aggregatedFunctionsFactory";
import { IQueryPropertiesExtractor, QuryResultRow } from "./queryPropertiesExtractorsFactory";

export class AggregatedQueryPropertiesExtractor implements IQueryPropertiesExtractor {
    private readonly groupProperties: Required<SelectValueQuery>[];
    private readonly aggregatedProperties: Required<AggregatedValueQuery>[];
    private readonly aggregates = new Map<string, AggregateGroup>();
    private readonly dbIds = new Map<string, number[]>();

    constructor(groupProperties: SelectValueQuery[], aggregatedProperties: AggregatedValueQuery[], private readonly settings: Settings) {
        this.groupProperties = groupProperties.map((x, i) => { return { ...x, name: x.name || `$grp_col_${i + 1}` }; });
        this.aggregatedProperties = aggregatedProperties.map((x, i) => { return { ...x, name: x.name || `$col_${i + 1}` }; });
    }

    push(dbId: number, element: IQueryableElement): void {
        const key = this.getGroupKey(element);

        let elementGroup: AggregateGroup;

        if (this.aggregates.has(key))
            elementGroup = this.aggregates.get(key)!;
        else {
            elementGroup = {
                functions: this.aggregatedProperties.map((x, i) => createAggregatedFunction({ ...x, name: x.name || `$col_${i + 1}` }, this.settings)),
                values: {}
            }

            for (const groupProperty of this.groupProperties)
                elementGroup.values[groupProperty.name] = groupProperty.fun(this.settings, element)

            this.aggregates.set(key, elementGroup);
        }

        for (const aggregateFunction of elementGroup.functions)
            aggregateFunction.push(dbId, element);

        const dbIds = this.dbIds.get(key) || [];

        dbIds.push(dbId);

        this.dbIds.set(key, dbIds);
    }

    compile(): QuryResultRow[] {
        const results: QuryResultRow[] = [];

        for (const [key, group] of this.aggregates) {
            const row: QuryResultRow = {
                dbIds: this.dbIds.get(key)!,
                values: group.values
            }

            for (const fun of group.functions)
                row.values[fun.name] = fun.compile();

            results.push(row);
        }
        
        return results;
    }

    getColumns(): string[] {
        const columns = this.aggregatedProperties.map(x => x.name);

        columns.splice(columns.length, 0, ...this.groupProperties.map(x => x.name));

        return columns;
    }

    private getGroupKey(element: IQueryableElement) {
        return this.groupProperties
            .map(x => `name=${x.name},value=${x.fun(this.settings, element)}`)
            .join("#")
    }
}

type AggregateGroup = {
    functions: IAggregatedFunction[];
    values: {
        [key: string]: string | number | undefined
    }
}