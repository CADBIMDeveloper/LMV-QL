import { Settings } from "../../output";
import { IFilterableElement } from "../filterableElement";
import { ElementQuery } from "../filterOperations";
import { AggregatedQueryPropertiesExtractor } from "./aggregatedQueryPropertiesExtractor";
import { QueryPropertiesExtractor } from "./queryPropertiesExtractor";

export interface IQueryPropertiesExtractor {
    push(dbId: number, element: IFilterableElement): void;

    compile(): QuryResultRow[];

    getColumns(): string[];
}

export type QuryResultRow = {
    dbIds: number[];
    values: {
        [key: string]: string | number | undefined
    }
}

export const createPropertiesExtractor = (query: ElementQuery, settings: Settings): IQueryPropertiesExtractor => query.aggregateProperties.length === 0
    ? new QueryPropertiesExtractor(query.selectProperties, settings)
    : new AggregatedQueryPropertiesExtractor(query.selectProperties, query.aggregateProperties, settings);