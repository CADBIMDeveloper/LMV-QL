import { Settings } from "../../output";
import { IQueryableElement } from "../queryableElement";
import { ElementQuery } from "../operations";
import { AggregatedQueryPropertiesExtractor } from "./aggregatedQueryPropertiesExtractor";
import { QueryPropertiesExtractor } from "./queryPropertiesExtractor";
import { AllPropertiesExtractor } from "./allPropertiesExtractor";

export interface IQueryPropertiesExtractor {
    push(dbId: number, element: IQueryableElement): void;

    compile(): QuryResultRow[];

    getColumns(): string[];
}

export type QuryResultRow = {
    dbIds: number[];
    values: {
        [key: string]: string | number | undefined
    }
}

export const createPropertiesExtractor = (query: ElementQuery, settings: Settings): IQueryPropertiesExtractor => {
    if (query.selectAll)
        return new AllPropertiesExtractor(settings);

    return query.aggregateProperties.length === 0
        ? new QueryPropertiesExtractor(query.selectProperties, settings)
        : new AggregatedQueryPropertiesExtractor(query.selectProperties, query.aggregateProperties, settings);
};