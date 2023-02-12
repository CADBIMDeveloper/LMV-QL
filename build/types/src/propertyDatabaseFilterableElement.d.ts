import { IFilterableElement } from "./filterableElement";
import { PropertyDatabase } from "./propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./propertyDatabaseAttributesCollection";
export declare class PropertyDatabaseFilterableElement implements IFilterableElement {
    readonly dbId: number;
    private readonly propertyDatabase;
    private readonly attributes;
    private readonly categoryNodesDbIds;
    constructor(dbId: number, propertyDatabase: PropertyDatabase, attributes: PropertyDatabaseAttributesCollection);
    get categoriesList(): string[];
    getPropertyValue(propertyName: string, categories: string[]): string | number | undefined;
    private compareCategories;
    private getNodePropertyValue;
}
