import { PropertyDatabase } from "./propertyDatabase";

export class PropertyDatabaseAttributesCollection {
    private readonly attributesIdsByName = new Map<string, number[]>();

    constructor(propertyDatabase: PropertyDatabase, private readonly attributesCaseSensitive: boolean) {
        propertyDatabase.enumAttributes((attrId, attrDef) => {
            const attributeName = attributesCaseSensitive 
                ? attrDef.name
                : attrDef.name.toLocaleLowerCase();

            const ids = this.attributesIdsByName.get(attributeName) || [];

            ids.push(attrId);

            this.attributesIdsByName.set(attributeName, ids);
        });
    }

    findAttributesIdsByName(name: string): number[] {
        const attributeName = this.attributesCaseSensitive
            ? name
            : name.toLocaleLowerCase();

        return this.attributesIdsByName.get(attributeName) || [];
    }
}