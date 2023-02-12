import { ElementPropertyValueQuery } from "./filterOperations";
export declare class ElementPropertyValueQueryFactory {
    private readonly semantics;
    constructor();
    createPropertyQuery(propertyQuery: string): ElementPropertyValueQuery;
}
