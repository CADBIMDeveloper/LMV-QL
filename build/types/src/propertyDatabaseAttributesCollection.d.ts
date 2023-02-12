import { PropertyDatabase } from "./propertyDatabase";
export declare class PropertyDatabaseAttributesCollection {
    private readonly attributesCaseSensitive;
    private readonly attributesIdsByName;
    constructor(propertyDatabase: PropertyDatabase, attributesCaseSensitive: boolean);
    readonly nameAttributeId: number;
    findAttributesIdsByName(name: string): number[];
}
