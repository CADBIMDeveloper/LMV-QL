export type PropertyDatabase = {
    findParent(dbId: number): number | null;

    enumAttributes(callBack: (attrId: number, attrDef: AttributeDefinition) => void): void;

    enumObjectProperties(dbId: number, callBack: (attrId: number, attrValueId: number) => void): void;

    getAttrValue(attrId: number, attrValueId: number): string | number;
}

export type AttributeDefinition = {
    category: string;
    name: string;
    dataType: number;
    displayName: string | null;
}