import { AttributeDefinition, PropertyDatabase } from "../../propertyDatabase";

export const doubleRootPdb: PropertyDatabase = {
    findRootNodes: function (): number[] {
        return [1];
    },
    findParent: function (dbId: number): number | null {
        return 2 <= dbId && dbId <= 3 ? dbId - 1 : null;
    },
    enumAttributes: function (callBack: (attrId: number, attrDef: AttributeDefinition) => void): void {
        callBack(1, { name: "name", category: "__name__", dataType: 20, displayName: null });
        callBack(2, { name: "element property", category: "props", dataType: 20, displayName: null });
    },
    enumObjectProperties: function (dbId: number, callBack: (attrId: number, attrValueId: number) => void): boolean | void {
        if (dbId === 1) // root
            callBack(1, 1); // name
        if (dbId === 2) // root...again
            callBack(1, 2);
        if (dbId === 3) { // element
            callBack(1, 3);
            callBack(2, 4);
        }
    },
    getAttrValue: function (attrId: number, attrValueId: number): string | number {
        if (attrId === 1 && (attrValueId === 1 || attrValueId === 2))
            return "root";
        
        if (attrId === 1 && attrValueId === 3)
            return "Element";
        
        if (attrId === 2 && attrValueId === 4)
            return 5.7;

        throw new Error("Values is not supported");
    },
    enumObjects: function (callBack: (dbId: number) => void): void {
        for (let i = 1; i <= 3; ++i)
            callBack(i);
    },
    getNodeNameAndChildren: function (query: { dbId: number; }): { dbId: number; parent: number; }[] | undefined {
        if (1 <= query.dbId && query.dbId <= 2) {
            return [{
                dbId: query.dbId + 1,
                parent: query.dbId
            }];
        }
        return undefined;
    }
}