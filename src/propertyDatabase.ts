export type PropertyDatabase = {
    findRootNodes(): number[];

    findParent(dbId: number): number | null;

    enumAttributes(callBack: (attrId: number, attrDef: AttributeDefinition) => void): void;

    enumObjects(callBack: (dbId: number, fromId?: number, toId?: number) => void): void;

    enumObjectProperties(dbId: number, callBack: (attrId: number, attrValueId: number) => void): void;

    getNodeNameAndChildren(query: { dbId: number }): { dbId: number, parent: number }[];

    getObjectProperties(dbId: number): ObjectProperties;

    _getObjectProperty(attrId: number, attrValueId: number): PropertyValue;
}

export type AttributeDefinition = {
    category: string;
    name: string;
    dataType: number;
    displayName: string | null;
}

export type PropertyValue = {
    attributeName: string;
    displayCategory: string | null;
    displayName: string;
    displayValue: string | number;
    hidden: boolean;
    precision: number;
    type: number;
    units: string | null
}

export type ObjectProperties = {
    dbId: number;
    externalId: number;
    name: string;
    properties: PropertyValue[]
}